export interface VideoData {
  id?: string;
  title: string;
  type?: string;
  date: Date;
  updated: Date;
  description?: string;
  links: Record<string, any>;
  cover?: string;
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
