/* eslint-disable */

export interface File {
  /** Unique identifier of the file (MinIO object ID) */
  id?: string;
  /** Full URL to the file in MinIO storage */
  path?: string;
  /** Original filename */
  file_name?: string;
  /** MIME type of the file */
  mime?: string;
  /** File category derived from mime type */
  type?: string;
  /**
   * File size in bytes
   * @nullable
   */
  size?: number | null;
  /**
   * Display title of the file
   * @nullable
   */
  title?: string | null;
  /**
   * Description of the file
   * @nullable
   */
  description?: string | null;
  /**
   * Additional notes for the file
   * @nullable
   */
  note?: string | null;
  /** Creation timestamp */
  created_at?: string;
  /**
   * Last update timestamp
   * @nullable
   */
  updated_at?: string | null;
  /**
   * ID of the user who uploaded the file
   * @nullable
   */
  created_by?: string | null;
  /**
   * ID of the user who last updated the file
   * @nullable
   */
  updated_by?: string | null;
}
