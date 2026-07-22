import type { Post } from "@/api/models/post";
import type { PostContent as APIPostContent } from "@/api/models/postContent";
import type { PostContentImage as APIPostContentImage } from "@/api/models/postContentImage";

export interface ImageCompressInfo {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  preload?: string;
}

export interface PostContentImage extends APIPostContentImage {
  file?: {
    compress_info?: ImageCompressInfo;
    path?:string
  };
}

export interface PostContent extends APIPostContent {
  post_content_images?: PostContentImage[];
}

export interface PostExtended extends Post {
  thumbnail_compress_info?: ImageCompressInfo;
  post_content?: PostContent[];
  author?: string;
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
  thumbnail_compress_info?: ImageCompressInfo;
  thumbnail_path?: string | null;
  link?: string;
}
