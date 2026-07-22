/* eslint-disable */

export interface CandidateFileBulkCreated {
  id: string;
  candidate_id: string;
  file_id: string;
  created_at: string;
}

export interface CandidateFileBulkData {
  created: CandidateFileBulkCreated[];
  skippedFileIds: string[];
}

export interface CandidateFileBulkResponse {
  status: string;
  responseData: {
    data: CandidateFileBulkData;
    message: string;
  };
}
