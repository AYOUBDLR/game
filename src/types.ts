export type Platform = 'iOS' | 'Android' | 'All';
export type AppCategory = 'Games' | 'Apps';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  device: 'iOS' | 'Android';
}

export interface AppItem {
  id: string;
  name: string;
  shortName: string;
  category: AppCategory;
  subCategory: string;
  rating: number;
  reviewsCount: number;
  downloads: string;
  version: string;
  size: string;
  updated: string;
  author: string;
  featured: boolean;
  trending: boolean;
  isNew?: boolean;
  platforms: ('iOS' | 'Android')[];
  subtitle: string;
  description: string;
  features: string[];
  iconType: string;
  iconUrl?: string;
  downloadUrl?: string;
  bannerGradient: string;
  accentColor: string;
  screenshots: string[];
  tags: string[];
  compatibility: string;
  reviews: Review[];
}

export type ViewFilter = 'Discover' | 'Games' | 'Apps' | 'Bookmarks' | 'Guides';
