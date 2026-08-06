/* eslint-disable */

export interface QuestionMutate {
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
  /** @maxLength 20 */
  phone_number: string;
  /** @maxLength 255 */
  email: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  address: string;
  /** @minLength 1 */
  content: string;
}
