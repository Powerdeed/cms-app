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

export interface GCSFileMetadata {
  name: string; // Full path: "projects/metro-bridge/hero-image.jpg"
  bucket: string; // "ptr-command-center-assets"
  generation: string; // Version identifier
  metageneration: string; // Metadata version
  contentType: string; // "image/jpeg", "application/pdf", etc.
  timeCreated: string; // ISO timestamp: "2026-01-15T10:30:00.000Z"
  updated: string; // ISO timestamp
  storageClass: string; // "STANDARD", "NEARLINE", etc.
  size: string; // Size in bytes: "2457600"
  md5Hash: string; // Hash for integrity
  mediaLink: string; // Download URL
  metadata?: {
    // Custom metadata you can add
    usage?: string; // "Metro Bridge Project"
    category?: string; // "projects", "website", etc.
    tags?: string; // "bridge,infrastructure,featured"
    usedIn?: string; // "homepage-hero,project-123"
  };
}
