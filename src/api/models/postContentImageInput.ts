/* eslint-disable */

export interface PostContentImageInput {
  /** Image position */
  position: number;
  /**
   * File ID reference (MinIO object ID)
   * @nullable
   */
  file_id?: string | null;
}
