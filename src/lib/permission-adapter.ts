/**
 * Permission Adapter
 * Map between backend API format (fine-grained actions) and UI format (dynamic)
 */

import type { ModulePermission } from '@/types/permissions-page';
import type { Permission as BackendPermission } from '@/api/models/permission';

/**
 * Display labels (English) for each action
 */
export const ACTION_LABELS: Record<string, string> = {
  // Dashboard
  view_summary: 'View Summary',
  view_overview: 'View Overview',
  view_monthly_traffic: 'View Monthly Traffic',
  // News
  view_detail: 'View Details',
  create_post_info: 'Add Post',
  select_thumbnail: 'Select Thumbnail',
  add_text_section: 'Add Text Section',
  add_image_section: 'Add Image Section',
  // Common
  create: 'Create',
  update: 'Edit',
  delete: 'Delete',
  filter: 'Filter',
  read: 'View',
  download: 'Download',
  // Gallery
  upload: 'Upload',
  // Quotation
  view_statistics: 'View Statistics',
  add_attachment: 'Attach File',
  reply_email: 'Reply to Email',
  update_status: 'Edit Status',
  download_attachment: 'Download File',
  reply_customer: 'Reply to Customer',
  // Category
  add_children: 'Add Subcategory',
  view_post: 'View Post',
  edit: 'Edit',
  // Users
  deactivate: 'Deactivate',
  // Settings
  create_logo: 'Create Logo',
  delete_logo: 'Delete Logo',
  update_logo: 'Update Logo',
  create_banner: 'Create Banner',
  update_banner: 'Update Banner',
  delete_banner: 'Delete Banner',
  create_contact: 'Create Contact Info',
  update_contact: 'Edit Contact Info',
  delete_contact: 'Delete Contact Info',
  manage_banner: 'Manage Banner',
  infor_contact: 'Contact Info',
  view: 'View',
  // Footer
  update_system: 'System Info',
  update_address: 'Address',
  update_basic_info: 'Basic Info',
  update_social: 'Social Media',
  // Work Schedule
  create_collaborate: 'Add Event/Business Trip',
  edit_collaborate: 'Edit Event/Business Trip',
  create_participants: 'Add Participants',
  delete_collaborate: 'Delete Event/Business Trip',
  // Diagram
  delete_personnel: 'Delete Personnel',
  edit_personnel: 'Edit Personnel Info',
  personnel_same_level: 'Add Same-Level Personnel',
  personnel_inferior: 'Add Subordinate',
  personnel_drop: 'Drag and Drop Personnel',
  create_root_node: 'Create Root Node',
  // Post Approval
  approve_post: 'Approve Post',
  view_history: 'View History',
  // Role
  add: 'Add',
  add_user: 'Assign Role to User',
  update_permission: 'Update Permissions',
  // Auth
  login: 'Login',
  logout: 'Logout',
};

/**
 * Get the display label for an action
 */
export function getActionLabel(action: string): string {
  return ACTION_LABELS[action] || action;
}

/**
 * Module (resource) definitions with display names
 */
export const MODULE_DEFINITIONS = [
  { id: 'dashboard', name: 'Dashboard', description: 'Overview page' },
  { id: 'news', name: 'News', description: 'Manage posts and news' },
  { id: 'category', name: 'Categories', description: 'Manage product categories' },
  { id: 'gallery', name: 'Image Library', description: 'Manage images' },
  { id: 'gallery_video', name: 'Video Library', description: 'Manage videos' },
  { id: 'gallery_document', name: 'Document Library', description: 'Manage documents' },
  { id: 'quotation', name: 'Quotation', description: 'Manage quotation requests' },
  { id: 'users', name: 'Users', description: 'Manage user accounts' },
  { id: 'settings', name: 'Settings', description: 'Configure banner, logo' },
  { id: 'contact', name: 'Contact', description: 'Manage contact information' },
  { id: 'template_type', name: 'Template Types', description: 'Manage quotation template types' },
  { id: 'footer', name: 'Footer', description: 'Manage footer content' },
  { id: 'role', name: 'Roles', description: 'Manage roles and permissions' },
  { id: 'user_role', name: 'Role Assignment', description: 'Assign roles to users' },
  {
    id: 'work-schedule',
    name: 'Work Schedule',
    description: 'Manage work schedules',
  },
  {
    id: 'post-approval-1',
    name: 'Post Approval Round 1',
    description: 'Manage level 1 post approval',
  },
  {
    id: 'post-approval-2',
    name: 'Post Approval Round 2',
    description: 'Manage level 2 post approval',
  },
  {
    id: 'diagram',
    name: 'Organizational Chart',
    description: 'Manage organizational chart permissions',
  },
];

/**
 * Build the list of modules from backend permissions
 */
export function buildModulesFromPermissions(
  backendPermissions: BackendPermission[]
): ModulePermission[] {
  const permsByResource: Record<string, BackendPermission[]> = {};
  backendPermissions.forEach((p) => {
    const res = p.resource || 'unknown';
    if (!permsByResource[res]) permsByResource[res] = [];
    permsByResource[res].push(p);
  });

  const modules: ModulePermission[] = [];

  MODULE_DEFINITIONS.forEach((def) => {
    const perms = permsByResource[def.id];
    if (!perms || perms.length === 0) return;

    const availableActions = perms.map((p) => p.action || '').filter(Boolean);
    const permissions: Record<string, boolean> = {};
    availableActions.forEach((a) => {
      permissions[a] = false;
    });

    modules.push({
      id: def.id,
      name: def.name,
      description: def.description,
      permissions,
      availableActions,
    });
  });

  Object.entries(permsByResource).forEach(([resource, perms]) => {
    if (MODULE_DEFINITIONS.find((m) => m.id === resource)) return;
    const availableActions = perms.map((p) => p.action || '').filter(Boolean);
    const permissions: Record<string, boolean> = {};
    availableActions.forEach((a) => {
      permissions[a] = false;
    });
    modules.push({
      id: resource,
      name: resource,
      description: `Manage ${resource}`,
      permissions,
      availableActions,
    });
  });

  return modules;
}

/**
 * Convert role permissions (from backend) → ModulePermissions
 */
export function rolePermissionsToModulePermissions(
  rolePermissions: unknown[],
  moduleDefinitions: { id: string; name: string; description: string }[],
  allBackendPermissions?: BackendPermission[]
): ModulePermission[] {
  const activePerms = rolePermissions
    .map(
      (rp) =>
        (rp as Record<string, unknown>)?.permission as
        | BackendPermission
        | undefined
    )
    .filter((p): p is BackendPermission => !!p);

  const activeSet = new Set(activePerms.map((p) => `${p.resource}:${p.action}`));

  const allByResource: Record<string, BackendPermission[]> = {};
  (allBackendPermissions || []).forEach((p) => {
    const res = p.resource || 'unknown';
    if (!allByResource[res]) allByResource[res] = [];
    allByResource[res].push(p);
  });

  return moduleDefinitions
    .filter((def) => allByResource[def.id] && allByResource[def.id].length > 0)
    .map((def) => {
      const perms = allByResource[def.id] || [];
      const availableActions = perms.map((p) => p.action || '').filter(Boolean);
      const permissions: Record<string, boolean> = {};
      availableActions.forEach((action) => {
        permissions[action] = activeSet.has(`${def.id}:${action}`);
      });
      return {
        id: def.id,
        name: def.name,
        description: def.description,
        permissions,
        availableActions,
      };
    });
}

/**
 * Convert ModulePermissions → backend permission IDs
 */
export function modulePermissionsToBackendPermissionIds(
  modulePermissions: ModulePermission[],
  allBackendPermissions: BackendPermission[]
): string[] {
  const ids: string[] = [];
  modulePermissions.forEach((module) => {
    Object.entries(module.permissions).forEach(([action, enabled]) => {
      if (!enabled) return;
      const match = allBackendPermissions.find(
        (p) => p.resource === module.id && p.action === action
      );
      if (match?.id) ids.push(match.id);
    });
  });
  return ids;
}
