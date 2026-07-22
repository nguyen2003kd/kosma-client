export type SidebarIconKey =
  | 'dashboard'
  | 'news'
  | 'category'
  | 'image-library'
  | 'video-library'
  | 'document-library'
  | 'quotation'
  | 'users'
  | 'permissions'
  | 'settings'
  | 'contact'
  | 'template-type'
  | 'footer'
  | 'organizational-chart'
  | 'work-schedule'
  | 'circleCheckBig';

export type AppRouteAccessRule = {
  resources: string[];
  requiredActions?: string[];
};

export type AppRouteConfig = {
  path: string;
  access: AppRouteAccessRule;
  sidebar?: {
    label: string;
    icon: SidebarIconKey;
  };
};

export const APP_ROUTES: AppRouteConfig[] = [
  
  {
    path: '/work-schedule',
    access: { resources: ['work-schedule'], requiredActions: ['view'] },
    sidebar: { label: 'Lịch Công tác', icon: 'work-schedule' },
  },
];
