/* eslint-disable */

import type { File } from './file';

/** Response shape for POST /api/v1.0/file/bulk */
export interface PostApiV10FileBulk200Data {
  /** Array of uploaded file records */
  data?: File[];
  message?: string;
}

/** Full API response wrapper (matches axios res.data structure) */
export interface PostApiV10FileBulk200 {
  status: string;
  responseData: PostApiV10FileBulk200Data;
}
