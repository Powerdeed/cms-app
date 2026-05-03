export const assetRoles = [
  "hero",
  "thumbnail",
  "gallery",
  "icon",
  "certificate",
  "document",
  "logo",
  "banner",
  "background",
] as const;

export type AssetRole = (typeof assetRoles)[number];
