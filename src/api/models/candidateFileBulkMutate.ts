/* eslint-disable */

export interface CandidateFileBulkMutate {
  /** Candidate ID */
  candidate_id: string;
  /** List of file IDs (MinIO object IDs) */
  file_ids: string[];
}
