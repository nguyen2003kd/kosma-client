/* eslint-disable */

export interface Contact {
  /** Unique identifier */
  id?: string;
  /** First name */
  first_name?: string;
  /** Last name (family name) */
  last_name?: string;
  /**
   * Contact email
   * @nullable
   */
  email?: string | null;
  /**
   * Contact phone number
   * @nullable
   */
  phone_number?: string | null;
  /**
   * Message content
   * @nullable
   */
  content?: string | null;
  /**
   * Contact address
   * @nullable
   */
  address?: string | null;
  /**
   * Type of contact content
   * @nullable
   */
  content_type?: string | null;
  /**
   * Preferred appointment date
   * @nullable
   */
  preferred_date?: string | null;
  /**
   * Preferred appointment time slot
   * @nullable
   */
  preferred_time?: string | null;
  /**
   * Creation timestamp
   * @nullable
   */
  created_at?: string | null;
}
