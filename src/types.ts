export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  codePreview?: string;
  githubUrl: string;
  liveUrl: string;
}