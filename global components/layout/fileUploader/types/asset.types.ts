import { FileType } from "./fileUploader.types";

export type { FileType };

export type AssetStatus = "active" | "archived" | "deleted";

export type AssetUsagePaths = Record<string, string[]>;

export type AssetLink = [
  assetId: string,
  fileName: string,
  fileUrl: string,
  assetType: FileType,
];

export interface FeaturedImageLink {
  assetId: string;
  fileName: string;
  fileUrl: string;
  assetType: FileType;
}

export interface AssetReference {
  id: string;
  category: string;
  usage: string;
  entityId?: string;
  field?: string;
  role?: string;
  label?: string;
}

export type DeleteAssetReferenceAction = "block" | "unlink" | "force";

export interface Asset {
  id: string;
  name: string;
  originalName: string;
  assetType: FileType;
  mimeType: string;
  size: number;

  storage: {
    provider: "gcs";
    bucket: string;
    objectName: string;
    generation: string;
    publicUrl: string;
  };

  uploadDate: string;
  createdAt: string;
  updatedBy: string;
  type: FileType;
  fullPath: string;

  tags?: string[];

  display?: {
    alt: string;
    caption: string;
    title: string;
  };

  references?: AssetReference[];
  status?: AssetStatus;
  isPublic?: boolean;
  createdBy?: string;
  updatedAt?: string;
  url?: string;
  contentType?: string;
}

export type RawAsset = Partial<Asset> & {
  id?: string;
  name?: string;
  size?: number;
  storage?: Partial<Asset["storage"]>;
};
