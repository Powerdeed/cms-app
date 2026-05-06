import { FileType } from "./fileUploader.types";

export type { FileType };

export type AssetStatus = "active" | "archived" | "deleted";

export type AssetUsagePaths = Record<string, string[]>;

export type AssetRef = [assetId: string, fileName: string];

export interface AssetRelationship {
  entityType: string;
  entityId: string;
  field: string;
  role: string;
}

export interface Asset {
  id: string;
  name: string;
  originalName?: string;
  assetType?: FileType;
  mimeType?: string;
  size: number | string;
  storage?: {
    provider: "gcs";
    bucket: string;
    objectName: string;
    generation: string;
    publicUrl: string;
  };
  classification?: {
    category: string;
    usage: string;
    tags: string[];
  };
  display?: {
    alt: string;
    caption: string;
    title: string;
  };
  relationships?: AssetRelationship[];
  status?: AssetStatus;
  isPublic?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;

  type?: FileType;
  usage?: string;
  uploadDate?: string;
  url?: string;
  fullPath?: string;
  category?: string;
  contentType?: string;
}
