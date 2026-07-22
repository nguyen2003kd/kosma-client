import { ApiOrgNode, OrgNode } from '@/types/organization';

// Map API nodes into a normalized OrgNode tree with sensible fallbacks.
export const mapApiNodeToOrgNode = (node: ApiOrgNode): OrgNode => {
  const childNodes = Array.isArray(node.children) ? node.children : [];

  return {
    id: node.id || crypto.randomUUID(),
    parent_id: node.parent_id ?? null,
    department_id: node.department_id || '',
    department_name: node.department_name || 'Chưa xác định',
    full_name: node.full_name || 'Chưa cập nhật',
    position: node.position || 'Chưa cập nhật',
    avatar_url: node.avatar_url || null,
    description: node.description || null,
    children: childNodes.map(mapApiNodeToOrgNode),
  };
};

// Normalize avatar URL so it works with both absolute and relative paths.
export const resolveAvatarSrc = (value?: string | null): string | undefined => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return value;
  return `/${value}`;
};
