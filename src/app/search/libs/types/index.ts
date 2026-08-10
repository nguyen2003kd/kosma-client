export interface SearchResult {
  id: string;
  title: string;
  summary?: string;
  category?: {
    id: string;
    name: string;
  };
  thumbnail_path?: string | null;
  publish_date?: string;
  created_at?: string;
  slug?: string;
  is_service?: boolean;
}
