export const SECURITY_PAGE_DATA = {
  heading: "Security",
  subheading: "Review account protection, sessions, recovery, and access",
};

export const SECURITY_STATS = [
  {
    label: "Session",
    value: "Protected",
    tone: "bg-(--primary-green)/15 text-(--primary-green)",
  },
  {
    label: "Recovery",
    value: "Available",
    tone: "bg-(--secondary-blue)/10 text-(--secondary-blue)",
  },
  {
    label: "Role access",
    value: "Read-only",
    tone: "bg-(--primary-yellow)/25 text-(--primary-blue)",
  },
];

export const SECURITY_CHECKS = [
  "Authorization token is attached to API requests",
  "Expired sessions redirect to login",
  "Password reset flow is available",
  "Role changes are blocked from self-service profile editing",
];

export const SESSION_ROWS = [
  {
    label: "Current browser",
    detail: "Signed in from this command center session",
    status: "Active",
  },
  {
    label: "Refresh token",
    detail: "Used to keep sessions alive when supported by the API",
    status: "Stored",
  },
  {
    label: "All sessions",
    detail: "Needs the commented /auth/sessions endpoint to be enabled",
    status: "Pending API",
  },
];

