'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Project } from '@/lib/project-types';
import { projectFormSchema, type ProjectFormInput } from '@/lib/project-schema';
import { Button, GhostButton } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';
import { Label } from '@/components/atoms/label';
import { Sparkles, Trash2, Pencil, Save, Plus, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';

const defaultValues: ProjectFormInput = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  repoUrl: '',
  liveUrl: '',
  stack: ['Next.js', 'TypeScript'],
  impact: '',
  sortOrder: 0,
  featured: false,
  visible: true,
};

export function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
  
  const [projects, setProjects] = useState(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editingProject = useMemo(() => projects.find((project) => project.id === editingId) ?? null, [editingId, projects]);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  function setPreview(next: string | null) {
    setCoverPreview((current) => {
      if (current?.startsWith('blob:')) URL.revokeObjectURL(current);
      return next;
    });
  }

  useEffect(() => {
    if (!editingProject) {
      reset(defaultValues);
      setCoverFile(null);
      setPreview(null);
      return;
    }

    reset({
      title: editingProject.title,
      slug: editingProject.slug,
      summary: editingProject.summary,
      description: editingProject.description,
      repoUrl: editingProject.repoUrl,
      liveUrl: editingProject.liveUrl ?? '',
      stack: editingProject.stack,
      impact: editingProject.impact ?? '',
      sortOrder: editingProject.sortOrder,
      featured: editingProject.featured,
      visible: editingProject.visible,
    });
    setCoverFile(null);
    setPreview(editingProject.coverImage ?? null);
  }, [editingProject, reset]);

  useEffect(() => {
    return () => {
      if (coverPreview?.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const stackValue = watch('stack');

  async function refresh() {
    const response = await fetch('/api/admin/projects', { cache: 'no-store' });
    if (response.ok) {
      const data = (await response.json()) as { projects: Project[] };
      setProjects(data.projects);
    }
  }

  async function fileToCompressedFile(file: File) {
    const bitmap = await createImageBitmap(file);
    const maxWidth = 1400;
    const maxHeight = 1400;
    const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context is unavailable.');

    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((result) => resolve(result), 'image/jpeg', 0.82);
    });

    if (!blob) throw new Error('Image compression failed.');
    return new File([blob], `${file.name.replace(/\.[^.]+$/, '') || 'cover'}.jpg`, { type: 'image/jpeg' });
  }

  async function onCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setNotice(null);
    try {
      const compressed = await fileToCompressedFile(file);
      setCoverFile(compressed);
      setPreview(URL.createObjectURL(compressed));
      setNotice('Cover image uploaded and compressed.');
    } catch {
      setCoverFile(null);
      setNotice('Could not process that image. Try another file.');
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  const onSubmit = handleSubmit(
    async (values) => {
      console.log("SUBMIT START", values);

      setBusy(true);
      setNotice(null);

      try {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('summary', values.summary);
        formData.append('description', values.description);
        formData.append('repoUrl', values.repoUrl);

        if (values.liveUrl) {
          formData.append('liveUrl', values.liveUrl);
        }

        formData.append('stack', values.stack.join(','));
        formData.append('impact', values.impact);
        formData.append('sortOrder', String(values.sortOrder));
        formData.append('featured', String(values.featured));
        formData.append('visible', String(values.visible));

        if (editingProject?.coverImage) {
          formData.append('existingCoverImage', editingProject.coverImage);
        }

        if (coverFile) {
          formData.append('coverImage', coverFile);
        }

        const response = await fetch(
          editingProject
            ? `/api/admin/projects/${editingProject.id}`
            : '/api/admin/projects',
          {
            method: editingProject ? 'PUT' : 'POST',
            body: formData,
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          console.error("API ERROR:", data);
          setNotice(data?.error || 'Failed to save project.');
          return;
        }

        setNotice(editingProject ? 'Project updated.' : 'Project created.');
        setEditingId(null);
        setCoverFile(null);
        setPreview(null);
        reset(defaultValues);

        if (fileInputRef.current) fileInputRef.current.value = '';

        await refresh();
      } catch (err) {
        console.error("NETWORK ERROR:", err);
        setNotice('Network error.');
      } finally {
        setBusy(false);
      }
    },

    // ✅ SHOW VALIDATION ERRORS
    (errors) => {
      console.error("VALIDATION ERRORS:", errors);
      setNotice("Please fix the form errors.");
    }
  );

  async function removeProject(id: string) {
    const response = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setNotice('Project deleted.');
      setProjects((current) => current.filter((project) => project.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setCoverFile(null);
        setPreview(null);
      }
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="mb-6 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" /> Admin curation console</div>
          <h1 className="mt-2 text-2xl font-semibold text-white">Manage your portfolio projects</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">Only the GitHub account on the allowlist can access this dashboard. Add or update projects with a single uploaded cover image.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <div className="rounded-2xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm text-slate-200">{projects.length} projects</div>
          <Button onClick={() => { setEditingId(null); setCoverFile(null); setPreview(null); reset(defaultValues); }} disabled={busy}>
            <Plus className="h-4 w-4" /> New project
          </Button>
          <GhostButton onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut className="h-4 w-4" /> Sign out
          </GhostButton>
        </div>
      </div>

      {notice ? <div className="mb-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-50">{notice}</div> : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <form onSubmit={onSubmit} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{editingProject ? 'Edit project' : 'Create project'}</h2>
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{editingProject ? 'Update mode' : 'Create mode'}</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" error={errors.title?.message}><Input {...register('title')} placeholder="Project title" /></Field>
            <Field label="Slug" error={errors.slug?.message}><Input {...register('slug')} placeholder="project-slug" /></Field>
          </div>
          <Field label="Summary" error={errors.summary?.message}><Input {...register('summary')} placeholder="Short summary" /></Field>
          <Field label="Description" error={errors.description?.message}><Textarea {...register('description')} placeholder="Project details" /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Repository URL" error={errors.repoUrl?.message}><Input {...register('repoUrl')} placeholder="https://github.com/..." /></Field>
            <Field label="Live URL" error={errors.liveUrl?.message}><Input {...register('liveUrl')} placeholder="https://..." /></Field>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div>
              <Field label="Cover image upload">
                <div className="space-y-3 rounded-2xl border border-dashed border-white/15 bg-slate-950/40 p-4">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={onCoverChange} className="cursor-pointer py-2.5 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950 hover:file:bg-cyan-300" />
                  <p className="text-xs leading-6 text-slate-400">Upload one image. It is resized and compressed before being stored in the database.</p>
                </div>
              </Field>
            </div>
            <div className="flex items-end">
              <div className="w-40 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover preview" className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-center justify-center px-4 text-center text-xs leading-6 text-slate-500">Upload a cover image to see the preview here.</div>
                )}
              </div>
            </div>
          </div>

          <Field label="Impact statement" error={errors.impact?.message}><Input {...register('impact')} placeholder="Outcome or result" /></Field>

          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Stack (comma-separated)">
              <Input
                value={stackValue.join(', ')}
                onChange={(event) => setValue('stack', event.target.value.split(',').map((item) => item.trim()).filter(Boolean), { shouldValidate: true })}
                placeholder="Next.js, TypeScript, PostgreSQL"
              />
            </Field>
            <Field label="Sort order" error={errors.sortOrder?.message}><Input type="number" min="0" {...register('sortOrder')} /></Field>
            <div className="grid gap-4">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <input type="checkbox" {...register('featured')} className="h-4 w-4 rounded border-white/20 bg-transparent" /> Featured
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <input type="checkbox" {...register('visible')} className="h-4 w-4 rounded border-white/20 bg-transparent" /> Visible
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="submit" disabled={busy}>
              <Save className="h-4 w-4" /> {editingProject ? 'Save changes' : 'Create project'}
            </Button>
            <GhostButton type="button" onClick={() => { setEditingId(null); setCoverFile(null); setPreview(null); reset(defaultValues); }}>
              Reset form
            </GhostButton>
          </div>
        </form>

        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white">Current projects</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">Pick the projects that best represent your work. Edit, reorder, or remove them as your portfolio evolves.</p>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <article key={project.id} className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-4 backdrop-blur-md">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em] text-cyan-100">
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1">#{project.sortOrder}</span>
                      {project.featured ? <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1">Featured</span> : null}
                      {!project.visible ? <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">Hidden</span> : null}
                    </div>
                    <h3 className="text-base font-semibold text-white">{project.title}</h3>
                    <p className="text-sm leading-6 text-slate-300">{project.summary}</p>
                  </div>
                  <div className="flex gap-2">
                    <GhostButton type="button" onClick={() => setEditingId(project.id)}>
                      <Pencil className="h-4 w-4" /> Edit
                    </GhostButton>
                    <GhostButton type="button" onClick={() => removeProject(project.id)}>
                      <Trash2 className="h-4 w-4" /> Delete
                    </GhostButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      {children}
      {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}
