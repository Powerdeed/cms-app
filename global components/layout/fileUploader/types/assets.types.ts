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
