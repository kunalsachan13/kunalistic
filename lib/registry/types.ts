export type ToolCategory =
  | "image"
  | "pdf"
  | "creator"
  | "developer"
  | "text"
  | "student"
  | "ai";

export type ToolStatus =
  | "active"
  | "beta"
  | "coming-soon"
  | "maintenance"
  | "deprecated";

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ToolCategory;
  icon: string;
  tags: string[];
  status: ToolStatus;
  featured: boolean;
  trending: boolean;
  requiresAuth: boolean;
  requiresAI: boolean;
  supportsBatch: boolean;
  inputTypes: string[];
  outputTypes: string[];
  version: string;
  sortOrder: number;
  seo: ToolSEO;
  faq: ToolFAQ[];
  relatedSlugs?: string[];
}

export interface CategoryDefinition {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  icon: string;
  itemCount?: number;
}
