export const removeExtensionName = (fileName: string) =>
  fileName.split(".").slice(0, -1).join(".");
