/* eslint-disable */

export interface Tag {
  /** Unique identifier of the tag */
  id?: string;
  /** Name of the tag */
  name?: string;
  /** Creation timestamp */
  created_at?: string;
  /**
   * Last update timestamp
   * @nullable
   */
  updated_at?: string | null;
  /**
   * ID of the user who created the tag
   * @nullable
   */
  created_by?: string | null;
  /**
   * ID of the user who last updated the tag
   * @nullable
   */
  updated_by?: string | null;
}
