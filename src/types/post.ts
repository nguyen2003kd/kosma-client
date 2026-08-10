import type { Post } from "@/api/models/post";
import type { PostContent as APIPostContent } from "@/api/models/postContent";
import type { PostContentImage as APIPostContentImage } from "@/api/models/postContentImage";

export interface PostContentImage extends APIPostContentImage {
  file?: {
    path?: string
  };
}

export interface PostContent extends APIPostContent {
  post_content_images?: PostContentImage[];
}

export interface PostExtended extends Post {
  post_content?: PostContent[];
  author?: string;
  tags?: { id?: string; name?: string }[];
  category?: {
    id?: string;
    name?: string;
    code?: string;
    link?: string;
  };
}

export interface RelatedPostItem {
  id?: string;
  title?: string;
  slug?: string;
  summary?: string;
  thumbnail_path?: string | null;
  link?: string;
}
