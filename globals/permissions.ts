import { User, UserPermission, UserRole } from "./types/user.type";

export const PERMISSIONS = {
  CMS_DASHBOARD_READ: "cms.dashboard.read",
  CMS_LEADS_READ: "cms.leads.read",
  CMS_CONTENT_READ: "cms.content.read",
  CMS_CONTENT_WRITE: "cms.content.write",
  CMS_ASSETS_READ: "cms.assets.read",
  CMS_ASSETS_WRITE: "cms.assets.write",
  CMS_PROJECTS_READ: "cms.projects.read",
  CMS_PROJECTS_WRITE: "cms.projects.write",
  CMS_SERVICES_READ: "cms.services.read",
  CMS_SERVICES_WRITE: "cms.services.write",
  CMS_REPORTS_READ: "cms.reports.read",
  CMS_SETTINGS_MANAGE: "cms.settings.manage",
  CMS_USERS_MANAGE: "cms.users.manage",
  COMMAND_CENTER_APPS_LAUNCH: "command-center.apps.launch",
  COMMAND_CENTER_PERMISSIONS_MANAGE: "command-center.permissions.manage",
} as const satisfies Record<string, UserPermission>;

const editorPermissions: UserPermission[] = [
  PERMISSIONS.CMS_DASHBOARD_READ,
  PERMISSIONS.CMS_LEADS_READ,
  PERMISSIONS.CMS_CONTENT_READ,
  PERMISSIONS.CMS_CONTENT_WRITE,
  PERMISSIONS.CMS_ASSETS_READ,
  PERMISSIONS.CMS_ASSETS_WRITE,
  PERMISSIONS.CMS_PROJECTS_READ,
  PERMISSIONS.CMS_PROJECTS_WRITE,
  PERMISSIONS.CMS_SERVICES_READ,
  PERMISSIONS.CMS_SERVICES_WRITE,
  PERMISSIONS.CMS_REPORTS_READ,
  PERMISSIONS.COMMAND_CENTER_APPS_LAUNCH,
];

const rolePermissions: Record<UserRole, UserPermission[]> = {
  viewer: [
    PERMISSIONS.CMS_DASHBOARD_READ,
    PERMISSIONS.CMS_CONTENT_READ,
    PERMISSIONS.CMS_PROJECTS_READ,
    PERMISSIONS.CMS_SERVICES_READ,
    PERMISSIONS.COMMAND_CENTER_APPS_LAUNCH,
  ],
  sales: [
    PERMISSIONS.CMS_DASHBOARD_READ,
    PERMISSIONS.CMS_LEADS_READ,
    PERMISSIONS.CMS_PROJECTS_READ,
    PERMISSIONS.CMS_SERVICES_READ,
    PERMISSIONS.COMMAND_CENTER_APPS_LAUNCH,
  ],
  editor: editorPermissions,
  admin: [
    ...editorPermissions,
    PERMISSIONS.CMS_SETTINGS_MANAGE,
    PERMISSIONS.CMS_USERS_MANAGE,
    PERMISSIONS.COMMAND_CENTER_PERMISSIONS_MANAGE,
  ],
};

export function getEffectivePermissions(user?: User | null): UserPermission[] {
  if (!user) return [];

  return [...new Set([...(rolePermissions[user.role] ?? []), ...(user.permissions ?? [])])];
}

export function hasPermission(
  user: User | null | undefined,
  permission: UserPermission,
): boolean {
  return getEffectivePermissions(user).includes(permission);
}
