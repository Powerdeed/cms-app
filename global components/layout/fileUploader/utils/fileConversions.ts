import { FileType, MediaTypeResult } from "../types/fileUploader.types";

const fallbackMediaType: MediaTypeResult = {
  type: "unknown",
  mimeType: "application/octet-stream",
};

const extensionMap: Record<string, MediaTypeResult> = {
  ".jpg": { type: "image", mimeType: "image/jpeg" },
  ".jpeg": { type: "image", mimeType: "image/jpeg" },
  ".png": { type: "image", mimeType: "image/png" },
  ".gif": { type: "image", mimeType: "image/gif" },
  ".bmp": { type: "image", mimeType: "image/bmp" },
  ".webp": { type: "image", mimeType: "image/webp" },
  ".avif": { type: "image", mimeType: "image/avif" },
  ".svg": { type: "diagram", mimeType: "image/svg+xml" },
  ".mp4": { type: "video", mimeType: "video/mp4" },
  ".avi": { type: "video", mimeType: "video/x-msvideo" },
  ".mov": { type: "video", mimeType: "video/quicktime" },
  ".wmv": { type: "video", mimeType: "video/x-ms-wmv" },
  ".flv": { type: "video", mimeType: "video/x-flv" },
  ".mkv": { type: "video", mimeType: "video/x-matroska" },
  ".webm": { type: "video", mimeType: "video/webm" },
  ".pdf": { type: "document", mimeType: "application/pdf" },
  ".doc": { type: "document", mimeType: "application/msword" },
  ".docx": {
    type: "document",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  ".csv": { type: "document", mimeType: "text/csv" },
  ".xls": { type: "document", mimeType: "application/vnd.ms-excel" },
  ".xlsx": {
    type: "document",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  ".ppt": { type: "document", mimeType: "application/vnd.ms-powerpoint" },
  ".pptx": {
    type: "document",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  ".txt": { type: "document", mimeType: "text/plain" },
};

export const mediaType = (url: string): MediaTypeResult => {
  if (!url || typeof url !== "string") return fallbackMediaType;

  const cleanPath = url.toLowerCase().split(/[?#]/)[0];
  const extension = `.${cleanPath.split(".").pop()}`;

  return extensionMap[extension] ?? fallbackMediaType;
};

export const sizeOfFile = (bytes: number) => {
  if (bytes < 1000) return `${bytes} Bytes`;
  if (bytes < 1000000) return `${(bytes / 1000).toFixed(2)} KB`;
  return `${(bytes / 1000000).toFixed(2)} MB`;
};

export const toCamelCase = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const createPathUrl = (paths: (string | undefined | null)[]) =>
  paths.filter(Boolean).join("/");

export const toSafeFileName = (fileName: string) =>
  fileName
    .trim()
    .replace(/\\/g, "/")
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-") || "asset";

const objectNameFolders: Record<FileType, string> = {
  image: "images",
  document: "documents",
  diagram: "diagrams",
  video: "videos",
};

export const createAssetObjectName = (
  assetId: string,
  fileName: string,
  fileType: FileType,
) =>
  createPathUrl([
    objectNameFolders[fileType],
    assetId,
    toSafeFileName(fileName),
  ]);

export const fileExtension = (fileName: string) =>
  fileName.includes(".") ? `.${fileName.split(".").pop()}` : "";
