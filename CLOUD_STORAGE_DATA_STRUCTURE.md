# Google Cloud Storage - Data Structure for Media & Assets

## Current UI Data Structure

The Media & Assets UI currently expects an array of objects with this structure:

```typescript
interface Asset {
  id: number | string;
  name: string; // File name with extension
  type: string; // 'image', 'document', 'diagram', etc.
  size: string; // Human-readable size (e.g., "2.4 MB")
  usage: string; // Where/how the asset is used
  uploadDate: string; // ISO date string or formatted date
}
```

---

## Google Cloud Storage Organization

### Recommended Folder Structure

```
gs://ptr-command-center-assets/
│
├── certificates/
│   ├── license-engineering-2024.pdf
│   ├── iso-certification.pdf
│   └── safety-certificate.jpg
│
├── projects/
│   ├── metro-bridge/
│   │   ├── hero-image.jpg
│   │   ├── gallery-1.jpg
│   │   ├── gallery-2.jpg
│   │   └── blueprint.pdf
│   │
│   ├── solar-farm/
│   │   ├── hero-image.jpg
│   │   ├── diagram.svg
│   │   └── progress-photos/
│   │       ├── phase-1.jpg
│   │       └── phase-2.jpg
│   │
│   └── industrial-plant/
│       └── hero-image.jpg
│
├── website/
│   ├── homepage/
│   │   ├── hero-background.jpg
│   │   ├── experience-team.jpg
│   │   └── mission-vision.jpg
│   │
│   ├── about/
│   │   ├── overview-banner.jpg
│   │   └── team-photo.jpg
│   │
│   └── testimonials/
│       ├── john-anderson.jpg
│       ├── sarah-mitchell.jpg
│       └── david-chen.jpg
│
├── services/
│   ├── structural-engineering-icon.svg
│   ├── electrical-systems-icon.svg
│   └── mechanical-design-icon.svg
│
├── branding/
│   ├── logo-primary.svg
│   ├── logo-white.png
│   ├── logo-icon.png
│   └── brand-guidelines.pdf
│
└── documents/
    ├── company-profile.pdf
    ├── capabilities-statement.pdf
    └── service-brochure.pdf
```

---

## Google Cloud Storage Metadata Response

When you fetch files from Google Cloud Storage, each file object includes metadata:

```typescript
// Raw response from Google Cloud Storage API
interface GCSFileMetadata {
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
```

---

## Transformation Function: GCS → UI Format

Here's how you'd transform Google Cloud Storage data to match the UI structure:

```typescript
// Helper function to convert bytes to human-readable size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// Helper function to determine asset type from content type
function getAssetType(contentType: string): string {
  if (contentType.startsWith("image/")) {
    if (contentType === "image/svg+xml") return "diagram";
    return "image";
  }
  if (contentType === "application/pdf" || contentType.includes("document")) {
    return "document";
  }
  return "file";
}

// Helper function to extract file name from full path
function getFileName(fullPath: string): string {
  return fullPath.split("/").pop() || fullPath;
}

// Helper function to format date
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0]; // Returns "2026-01-15"
}

// Main transformation function
function transformGCSToAssets(gcsFiles: GCSFileMetadata[]): Asset[] {
  return gcsFiles.map((file, index) => ({
    id: file.generation || index.toString(),
    name: getFileName(file.name),
    type: getAssetType(file.contentType),
    size: formatFileSize(parseInt(file.size)),
    usage: file.metadata?.usage || file.metadata?.usedIn || "Not specified",
    uploadDate: formatDate(file.timeCreated),
    // Additional fields you might want to include:
    url: file.mediaLink,
    fullPath: file.name,
    category: file.name.split("/")[0], // 'projects', 'website', etc.
    contentType: file.contentType,
  }));
}
```

---

## Example: Fetching and Organizing by Folders

If you want to organize assets by folders (nested structure):

```typescript
interface AssetFolder {
  name: string;
  path: string;
  assets: Asset[];
  subfolders: AssetFolder[];
}

function organizeAssetsByFolder(gcsFiles: GCSFileMetadata[]): AssetFolder {
  const root: AssetFolder = {
    name: "root",
    path: "",
    assets: [],
    subfolders: [],
  };

  gcsFiles.forEach((file) => {
    const pathParts = file.name.split("/");
    const fileName = pathParts.pop();

    let currentFolder = root;
    let currentPath = "";

    // Navigate/create folder structure
    pathParts.forEach((folderName) => {
      currentPath += (currentPath ? "/" : "") + folderName;

      let subfolder = currentFolder.subfolders.find(
        (f) => f.name === folderName,
      );
      if (!subfolder) {
        subfolder = {
          name: folderName,
          path: currentPath,
          assets: [],
          subfolders: [],
        };
        currentFolder.subfolders.push(subfolder);
      }
      currentFolder = subfolder;
    });

    // Add file to current folder
    if (fileName) {
      currentFolder.assets.push({
        id: file.generation,
        name: fileName,
        type: getAssetType(file.contentType),
        size: formatFileSize(parseInt(file.size)),
        usage: file.metadata?.usage || "Not specified",
        uploadDate: formatDate(file.timeCreated),
        url: file.mediaLink,
        fullPath: file.name,
      });
    }
  });

  return root;
}
```

---

## Example: Firebase Cloud Storage Usage

```typescript
import {
  getStorage,
  ref,
  listAll,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";

async function fetchAllAssets(): Promise<Asset[]> {
  const storage = getStorage();
  const storageRef = ref(storage, "/"); // Root or specific folder

  try {
    // List all items (files and folders)
    const result = await listAll(storageRef);

    const assetPromises = result.items.map(async (itemRef) => {
      const metadata = await getMetadata(itemRef);
      const downloadURL = await getDownloadURL(itemRef);

      return {
        id: itemRef.fullPath,
        name: itemRef.name,
        type: getAssetType(metadata.contentType || ""),
        size: formatFileSize(metadata.size),
        usage: metadata.customMetadata?.usage || "Not specified",
        uploadDate: formatDate(metadata.timeCreated),
        url: downloadURL,
        fullPath: itemRef.fullPath,
      };
    });

    return await Promise.all(assetPromises);
  } catch (error) {
    console.error("Error fetching assets:", error);
    return [];
  }
}

// Fetch from specific folder
async function fetchAssetsFromFolder(folderPath: string): Promise<Asset[]> {
  const storage = getStorage();
  const folderRef = ref(storage, folderPath);

  const result = await listAll(folderRef);

  const assetPromises = result.items.map(async (itemRef) => {
    const metadata = await getMetadata(itemRef);
    const downloadURL = await getDownloadURL(itemRef);

    return {
      id: itemRef.fullPath,
      name: itemRef.name,
      type: getAssetType(metadata.contentType || ""),
      size: formatFileSize(metadata.size),
      usage: metadata.customMetadata?.usage || "Not specified",
      uploadDate: formatDate(metadata.timeCreated),
      url: downloadURL,
      fullPath: itemRef.fullPath,
    };
  });

  return await Promise.all(assetPromises);
}
```

---

## Custom Metadata Strategy

When uploading files to Google Cloud Storage, add custom metadata to track usage:

```typescript
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

async function uploadWithMetadata(file: File, path: string, usage: string) {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  const metadata = {
    customMetadata: {
      usage: usage, // "Metro Bridge Project"
      category: path.split("/")[0], // "projects"
      uploadedBy: "admin@powerdeed.tech", // User who uploaded
      tags: "bridge,infrastructure,featured", // Searchable tags
      usedIn: "homepage-projects,project-detail", // Where it's referenced
    },
  };

  await uploadBytes(storageRef, file, metadata);
}

// Example usage:
uploadWithMetadata(
  imageFile,
  "projects/metro-bridge/hero-image.jpg",
  "Metro Bridge Project - Hero Image",
);
```

---

## Complete Integration Example

Here's how you'd integrate this into your Media & Assets component:

```typescript
// In your MediaAssets component
import { useEffect, useState } from "react";
import { fetchAllAssets } from "./cloudStorageService";

export function MediaAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      setLoading(true);
      try {
        const fetchedAssets = await fetchAllAssets();
        setAssets(fetchedAssets);
      } catch (error) {
        console.error("Failed to load assets:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  // Rest of your component code...
  // Use `assets` instead of `mockAssets`
}
```

---

## Summary

**Key Points:**

1. **Folder Organization**: Use a logical folder structure in GCS (certificates, projects, website, services, branding, documents)

2. **Custom Metadata**: Add `usage`, `category`, `tags`, and `usedIn` as custom metadata when uploading files

3. **Transformation**: Convert GCS metadata to the UI format using helper functions

4. **Nested Structure**: Optionally organize assets by folder hierarchy for better navigation

5. **Data Format**: The UI expects a flat array of assets with: id, name, type, size, usage, uploadDate

6. **File Types**: Automatically determine asset type from `contentType` (image/jpeg → "image", application/pdf → "document")

This structure gives you flexibility to organize files logically in cloud storage while presenting them in a user-friendly way in the UI.
