/* eslint-disable */

export interface CandidateCreatedResponse {
  status: string;
  responseData: {
      id: string;
      recruitment_id?: string | null;
      position?: string | null;
      full_name?: string;
      address?: string;
      email?: string;
      phone?: string;
      language_proficiency?: string | null;
      it_proficiency?: string | null;
      education_level?: string | null;
      major?: string | null;
      cv_url?: string | null;
      cover_letter?: string | null;
      status?: string | null;
      note?: string | null;
      created_at?: string;
      updated_at?: string | null;
    message?: string;
  };
}
