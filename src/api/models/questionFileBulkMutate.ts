/* eslint-disable */

export interface QuestionFileBulkMutate {
  /** Question ID */
  question_id: string;
  /** List of file IDs (MinIO object IDs) */
  file_ids: string[];
}
