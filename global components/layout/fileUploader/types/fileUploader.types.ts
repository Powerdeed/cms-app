import { Asset } from "./asset.types";

export type FileType = "image" | "video" | "document" | "diagram";

export type MediaTypeResult = {
  type: FileType | "unknown";
  mimeType: string;
};

export type UploadedFile = Partial<Asset> & {
  filename?: string;
  imageUrl?: string;
  url?: string;
  storage?: {
    publicUrl?: string;
  };
  file?: {
    type: "Buffer";
    data: number[];
  };
  mimetype?: string;
  size?: number;
};
