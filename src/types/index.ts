export interface AppItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail_url: string;
  live_url: string;
  github_url: string;
  features: string[];
  tech_stack: string[];
  featured: boolean;
  status: 'live' | 'beta' | 'concept' | 'archived';
  views_count: number;
  likes_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface AppRequest {
  id: string;
  client_name: string;
  client_email: string;
  client_company?: string;
  project_title: string;
  project_type: string;
  budget_range: string;
  timeline?: string;
  description: string;
  features_needed?: string;
  preferred_tech?: string;
  reference_links?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'in_progress' | 'completed' | 'declined';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  totalApps: number;
  featuredApps: number;
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  completedRequests: number;
  totalViews: number;
  totalLikes: number;
}

export interface BudgetPreset {
  id: string;
  label: string;
  tag: string;
  desc: string;
}

export const DEFAULT_BUDGET_PRESETS: BudgetPreset[] = [
  { id: 'b1', label: 'Under $500', tag: 'MICRO', desc: 'Proof-of-concept / single-utility MVP' },
  { id: 'b2', label: '$500 - $1,500', tag: 'CORE', desc: 'Functional prototype + interactive workflow' },
  { id: 'b3', label: '$1,500 - $5,000', tag: 'POPULAR', desc: 'Full production SaaS MVP / complete launch' },
  { id: 'b4', label: '$5,000+', tag: 'SCALE', desc: 'Bespoke multi-tier enterprise architecture' },
];

export interface ServiceTypeOption {
  label: string;
  icon: string;
  desc: string;
}

export const DEFAULT_SERVICE_TYPES: ServiceTypeOption[] = [
  { label: '3D Animation', icon: '🎬', desc: 'Cinematic 3D sequences, character motion & product renders' },
  { label: 'Motion Graphics', icon: '✨', desc: 'Kinetic typography, animated promotional visuals & title intros' },
  { label: 'Web Design', icon: '📐', desc: 'Bespoke UI styling, high-converting landing pages & sleek design' },
  { label: 'SaaS Development', icon: '⚡', desc: 'Subscriptions, cloud systems & scalable customer portals' },
  { label: 'Custom Software Development', icon: '🛠️', desc: 'Tailored business software, custom APIs & automated workflows' },
  { label: 'Packaging Design', icon: '📦', desc: 'Physical product packaging, 3D box mockups & die-lines' },
  { label: '3D Design', icon: '🧊', desc: 'Spatial assets, realistic industrial models & CGI elements' },
  { label: 'Web Development', icon: '💻', desc: 'High-performance Next.js/React web platforms & cloud infrastructure' },
  { label: 'Animation', icon: '🌀', desc: 'Vector animation, dynamic UI micro-interactions & Lottie assets' },
  { label: 'Logo Design', icon: '✒️', desc: 'Signature brand marks, vector emblems & complete identity systems' },
  { label: 'User Experience Design (UED)', icon: '🎯', desc: 'User flows, wireframing, design systems & usability testing' },
  { label: 'Graphic Design', icon: '👁️', desc: 'Brand collateral, advertising assets, banners & digital media' },
];

