export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  repoUrl: string;
  liveUrl: string | null;
  coverImage: string | null;
  stack: string[];
  impact: string | null;
  sortOrder: number;
  featured: boolean;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
};
