import { PERMISSIONS, type UserPermission } from "@globals";

export const menuItems = [
  {
    label: "Dashboard",
    icon: "sliders",
    requiredPermission: PERMISSIONS.CMS_DASHBOARD_READ,
  },
  {
    label: "Leads & Inquiries",
    icon: "user-tie",
    requiredPermission: PERMISSIONS.CMS_LEADS_READ,
  },
  {
    label: "Services Management",
    icon: "list-check",
    requiredPermission: PERMISSIONS.CMS_SERVICES_READ,
  },
  {
    label: "Projects",
    icon: "folder",
    requiredPermission: PERMISSIONS.CMS_PROJECTS_READ,
  },
  {
    label: "Website Content",
    icon: "file-lines",
    requiredPermission: PERMISSIONS.CMS_CONTENT_READ,
  },
  {
    label: "Articles & Insights",
    icon: "newspaper",
    requiredPermission: PERMISSIONS.CMS_CONTENT_READ,
  },
  {
    label: "Media & Assets",
    icon: "images",
    requiredPermission: PERMISSIONS.CMS_ASSETS_READ,
  },
  {
    label: "Scheduling & Visibility",
    icon: "calendar",
    requiredPermission: PERMISSIONS.CMS_CONTENT_WRITE,
  },
  {
    label: "Data & Reports",
    icon: "chart-column",
    requiredPermission: PERMISSIONS.CMS_REPORTS_READ,
  },
  {
    label: "Customization",
    icon: "palette",
    requiredPermission: PERMISSIONS.CMS_SETTINGS_MANAGE,
  },
  {
    label: "Settings & Users",
    icon: "user-group",
    requiredPermission: PERMISSIONS.CMS_USERS_MANAGE,
  },
] satisfies {
  label: string;
  icon: string;
  requiredPermission: UserPermission;
}[];

export type MenuLabels = (typeof menuItems)[number]["label"];
