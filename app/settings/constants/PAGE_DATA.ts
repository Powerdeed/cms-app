export const SETTINGS_PAGE_DATA = {
  heading: "Settings",
  subheading: "Control command-center preferences and account behavior",
};

export const SETTINGS_GROUPS = [
  {
    title: "Command Preferences",
    description: "Shape the density and safeguards of your daily workspace.",
    options: [
      "Compact dashboard density",
      "Keep publish confirmations on",
      "Preserve panel filters between visits",
      "Show advanced asset metadata by default",
    ],
  },
  {
    title: "Notification Preferences",
    description: "Choose which account and content events should reach you.",
    options: [
      "Notify on failed uploads",
      "Security alerts",
      "Publishing summaries",
      "Weekly activity digest",
    ],
  },
  {
    title: "Editorial Workflow",
    description: "Tune the review flow for content and asset updates.",
    options: [
      "Draft before publish",
      "Require asset metadata before linking",
      "Warn before replacing live media",
      "Mark stale pages for review",
    ],
  },
];

export const SETTINGS_SHORTCUTS = [
  {
    label: "Profile details",
    value: "Name, email, photo, phone",
    status: "Profile page",
  },
  {
    label: "Role changes",
    value: "Promotions, demotions, access grants",
    status: "Settings & Users",
  },
  {
    label: "Password recovery",
    value: "Reset links and recovery checks",
    status: "Security page",
  },
];

