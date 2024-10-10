export interface VideoData {
  id?: string;
  title: string;
  type?: string;
  date: Date;
  updated: Date;
  description?: string;
  links: Record<string, any>;
  cover?: string;
  coverId?: string;
}

export interface PostData {
  id?: string;
  title: string;
  type?: string;
  date: Date;
  updated: Date;
  description?: string;
  cover?: string;
}

export interface LiveData {
  id?: string;
  title: string;
  type?: string;
  date: Date;
  updated: Date;
  description?: string;
  cover?: string;
  coverId?: string;
  videoParts?: string[];
}
