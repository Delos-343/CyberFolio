import type { Project } from './project-types';
import type { ProjectInput } from './project-schema';

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const PROJECTS_TABLE = 'projects';
const PROJECT_COLUMNS =
  'id,title,slug,summary,description,repoUrl,liveUrl,coverImage,stack,impact,sortOrder,featured,visible,createdAt,updatedAt';

type SupabaseError = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

function ensureSupabaseConfig() {
  if (!SUPABASE_URL) {
    throw new Error('SUPABASE_URL is not configured.');
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured.');
  }
}

function buildHeaders(extra: HeadersInit = {}) {
  ensureSupabaseConfig();

  const headers = new Headers(extra);
  headers.set('apikey', SUPABASE_SERVICE_ROLE_KEY);
  headers.set('Authorization', `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`);
  headers.set('Content-Type', 'application/json');
  return headers;
}

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  ensureSupabaseConfig();

  const response = await fetch(new URL(path, SUPABASE_URL), {
    ...init,
    headers: buildHeaders(init.headers),
    cache: 'no-store',
  });

  const raw = await response.text();
  let data: unknown = null;

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
  }

  if (!response.ok) {
    const error = data as SupabaseError | null;
    const message = error?.message || `Supabase request failed with status ${response.status}.`;
    const err = new Error(message) as Error & { status?: number; code?: string; details?: string; hint?: string };
    err.status = response.status;
    err.code = error?.code;
    err.details = error?.details;
    err.hint = error?.hint;
    throw err;
  }

  return data as T;
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function normalizeProject(input: ProjectInput) {
  return {
    title: input.title,
    slug: input.slug,
    summary: input.summary,
    description: input.description,
    repoUrl: input.repoUrl,
    liveUrl: input.liveUrl || null,
    coverImage: input.coverImage || null,
    stack: input.stack,
    impact: input.impact || null,
    sortOrder: input.sortOrder,
    featured: input.featured,
    visible: input.visible,
    updatedAt: new Date().toISOString(),
  };
}

export async function listProjects(options: { visibleOnly?: boolean; limit?: number } = {}) {
  const rows = await supabaseRequest<Project[]>(`/rest/v1/${PROJECTS_TABLE}?select=${PROJECT_COLUMNS}`);
  const filtered = options.visibleOnly ? rows.filter((project) => project.visible) : rows;
  const sorted = sortProjects(filtered);
  return typeof options.limit === 'number' ? sorted.slice(0, options.limit) : sorted;
}

export async function createProject(input: ProjectInput) {
  const payload = normalizeProject(input);
  const rows = await supabaseRequest<Project[]>(`/rest/v1/${PROJECTS_TABLE}?select=${PROJECT_COLUMNS}`, {
    method: 'POST',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify([payload]),
  });

  return rows[0] ?? null;
}

export async function updateProject(id: string, input: ProjectInput) {
  const payload = normalizeProject(input);
  const rows = await supabaseRequest<Project[]>(`/rest/v1/${PROJECTS_TABLE}?id=eq.${encodeURIComponent(id)}&select=${PROJECT_COLUMNS}`, {
    method: 'PATCH',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  return rows[0] ?? null;
}

export async function deleteProject(id: string) {
  await supabaseRequest<void>(`/rest/v1/${PROJECTS_TABLE}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
