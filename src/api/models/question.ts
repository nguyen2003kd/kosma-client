/* eslint-disable */

export interface Question {
  /** Unique identifier */
  id?: string;
  /** First name */
  first_name?: string;
  /** Last name (family name) */
  last_name?: string;
  /** User phone number */
  phone_number?: string;
  /** User email */
  email?: string;
  /** User address */
  address?: string;
  /** Question content */
  content?: string;
  /**
   * Creation timestamp
   * @nullable
   */
  created_at?: string | null;
  /**
   * Last update timestamp
   * @nullable
   */
  updated_at?: string | null;
}
