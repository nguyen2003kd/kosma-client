export type ApiOrgNode = {
  id?: string;
  parent_id?: string | null;
  department_id?: string | null;
  department_name?: string | null;
  full_name?: string;
  position?: string | null;
  avatar_url?: string | null;
  description?: string | null;
  children?: ApiOrgNode[];
};

export type OrgNode = {
  id: string;
  parent_id: string | null;
  department_id: string;
  department_name: string;
  full_name: string;
  position: string;
  avatar_url: string | null;
  description: string | null;
  children: OrgNode[];
};
