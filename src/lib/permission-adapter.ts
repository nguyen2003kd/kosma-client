/**
 * Permission Adapter
 * Map giữa backend API format (fine-grained actions) và UI format (dynamic)
 */

import type { ModulePermission } from '@/types/permissions-page';
import type { Permission as BackendPermission } from '@/api/models/permission';

/**
 * Tên hiển thị tiếng Việt cho từng action
 */
export const ACTION_LABELS: Record<string, string> = {
  // Dashboard
  view_summary: 'Xem tổng quan',
  view_overview: 'Xem lượt xem',
  view_monthly_traffic: 'Xem theo tháng',
  // News
  view_detail: 'Xem chi tiết',
  create_post_info: 'Thêm bài viết',
  select_thumbnail: 'Chọn ảnh đại diện',
  add_text_section: 'Thêm section văn bản',
  add_image_section: 'Thêm section hình ảnh',
  // Common
  create: 'Thêm mới',
  update: 'Sửa',
  delete: 'Xóa',
  filter: 'Bộ lọc',
  read: 'Xem',
  download: 'Tải về',
  // Gallery
  upload: 'Tải lên',
  // Quotation
  view_statistics: 'Xem thống kê',
  add_attachment: 'Đính kèm tệp',
  reply_email: 'Trả lời email',
  update_status: 'Sửa trạng thái',
  download_attachment: 'Tải tệp',
  reply_customer: 'Phản hồi khách hàng',
  // Category
  add_children: 'Thêm danh mục con',
  view_post: 'Xem bài viết',
  edit: 'Chỉnh sửa',
  // Users
  deactivate: 'Vô hiệu hoá',
  // Settings
  create_logo: 'Tạo logo',
  delete_logo: 'Xóa logo',
  update_logo: 'Đổi logo',
  create_banner: 'Tạo banner',
  update_banner: 'Đổi banner',
  delete_banner: 'Xóa banner',
  create_contact: 'Tạo thông tin liên hệ',
  update_contact: 'Sửa thông tin liên hệ',
  delete_contact: 'Xóa thông tin liên hệ',
  manage_banner: 'Quản lý banner',
  infor_contact: 'Thông tin liên hệ',
  view: 'Xem',
  // Footer
  update_system: 'Thông tin hệ thống',
  update_address: 'Địa chỉ',
  update_basic_info: 'Thông tin cơ bản',
  update_social: 'Mạng xã hội',
  // Work Schedule
  create_collaborate: 'Thêm sự kiện/công tác',
  edit_collaborate: 'Sửa sự kiện/công tác',
  create_participants: 'Thêm người tham gia',
  delete_collaborate: 'Xóa sự kiện/công tác',
  // Diagram
  delete_personnel: 'Xóa nhân sự',
  edit_personnel: 'Chỉnh sửa thông tin nhân sự',
  personnel_same_level: 'Thêm người cùng cấp',
  personnel_inferior: 'Thêm người cấp dưới',
  personnel_drop: 'Di chuyển nhân sự bằng kéo thả',
  create_root_node: 'Tạo node gốc',
  // Duyệt bài
  approve_post: 'Duyệt bài',
  view_history: 'Xem lịch sử',
  // Role
  add: 'Thêm',
  add_user: 'Gán vai trò cho người dùng',
  update_permission: 'Cập nhật phân quyền',
  // Auth
  login: 'Đăng nhập',
  logout: 'Đăng xuất',
};

/**
 * Lấy label hiển thị cho một action
 */
export function getActionLabel(action: string): string {
  return ACTION_LABELS[action] || action;
}

/**
 * Định nghĩa module (resource) với tên hiển thị
 */
export const MODULE_DEFINITIONS = [
  { id: 'dashboard', name: 'Dashboard', description: 'Trang tổng quan' },
  { id: 'news', name: 'Tin tức', description: 'Quản lý bài viết và tin tức' },
  { id: 'category', name: 'Danh mục', description: 'Quản lý danh mục sản phẩm' },
  { id: 'gallery', name: 'Kho ảnh', description: 'Quản lý hình ảnh' },
  { id: 'gallery_video', name: 'Kho video', description: 'Quản lý video' },
  { id: 'gallery_document', name: 'Kho tài liệu', description: 'Quản lý tài liệu' },
  { id: 'quotation', name: 'Báo giá', description: 'Quản lý yêu cầu báo giá' },
  { id: 'users', name: 'Tài khoản', description: 'Quản lý tài khoản người dùng' },
  { id: 'settings', name: 'Cài đặt', description: 'Cấu hình banner, logo' },
  { id: 'contact', name: 'Liên hệ', description: 'Quản lý thông tin liên hệ' },
  { id: 'template_type', name: 'Loại mẫu', description: 'Quản lý loại mẫu báo giá' },
  { id: 'footer', name: 'Footer', description: 'Quản lý nội dung footer' },
  { id: 'role', name: 'Vai trò', description: 'Quản lý vai trò phân quyền' },
  { id: 'user_role', name: 'Gán vai trò', description: 'Gán vai trò cho người dùng' },
  {
    id: 'work-schedule',
    name: 'Lịch công tác',
    description: 'Quản lý lịch công tác',
  },
  {
    id: 'post-approval-1',
    name: 'Duyệt bài vòng 1',
    description: 'Quản lý duyệt bài cấp 1',
  },
  {
    id: 'post-approval-2',
    name: 'Duyệt bài vòng 2',
    description: 'Quản lý duyệt bài cấp 2',
  },
  {
    id: 'diagram',
    name: 'Sơ đồ tổ chức',
    description: 'Quản lý các quyền của sơ đồ tổ chức',
  },
];

/**
 * Build danh sach modules từ backend permissions
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
      description: `Quản lý ${resource}`,
      permissions,
      availableActions,
    });
  });

  return modules;
}

/**
 * Convert role permissions (từ backend) → ModulePermissions
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
