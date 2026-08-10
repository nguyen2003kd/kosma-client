/* eslint-disable */

export interface ContactMutate {
  /**
   * @minLength 1
   * @maxLength 255
   */
  first_name: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  last_name: string;
  /**
   * @maxLength 255
   * @nullable
   */
  email?: string | null;
  /**
   * @maxLength 20
   * @nullable
   * @pattern ^[0-9+\-\s()]*$
   */
  phone_number?: string | null;
  /** @nullable */
  content?: string | null;
  /** @nullable */
  address?: string | null;
  /** @nullable */
  content_type?: string | null;
  /** @nullable */
  preferred_date?: string | null;
  /** @nullable */
  preferred_time?: string | null;
}
