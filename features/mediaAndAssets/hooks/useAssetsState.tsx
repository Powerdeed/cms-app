"use client";

// modules
import { useContext, useEffect, useMemo } from "react";

// context
import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { MediaAssetsSearchContext } from "../context/MediaAssetsSearchContext";
import { globalContext } from "@globals";
import {
  FileUploaderErrorContext,
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/file-uploader";

// utils
import { mediaType, toCamelCase } from "@global components/layout/file-uploader";

// types
import { Asset } from "../types/mediaAssets.types";
import { FileType } from "@global components/layout/file-uploader";

export default function useAssetsState() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const errorContext = useContext(FileUploaderErrorContext);
  const searchContext = useContext(MediaAssetsSearchContext);
  const globalStates = useContext(globalContext);

  if (
    !mediaAssetsState ||
    !fileUploaderState ||
    !processingContext ||
    !errorContext ||
    !searchContext ||
    !globalStates
  ) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { user } = globalStates;

  const { assetCategory, firstPath, secondPath, targetAsset, setTargetAsset } =
    mediaAssetsState;

  const { featurePath, file, fileName, targetFileType } = fileUploaderState;
  const featurePathParts = featurePath.split("/").filter(Boolean);
  const resolvedAssetCategory = assetCategory || featurePathParts[0] || "";
  const resolvedFirstPath = firstPath || featurePathParts[1] || "";
  const resolvedSecondPath = secondPath || featurePathParts[2] || "";

  const fileMeta =
    fileName !== ""
      ? mediaType(fileName)
      : { type: "image" as const, mimeType: "image/jpeg" };

  const fileType: FileType =
    fileMeta.type === "unknown" ? "image" : fileMeta.type;

  const assetUsage = resolvedFirstPath
    ? `${resolvedFirstPath}${resolvedSecondPath ? `/${resolvedSecondPath}` : ""}`
    : "";

  const objectName = [resolvedAssetCategory, assetUsage, fileName]
    .filter(Boolean)
    .join("/");

  const computedTargetAsset: Asset = useMemo(() => {
    const now = new Date().toISOString();

    return {
      id: crypto.randomUUID(),
      name: fileName, // can be renamed.
      originalName: file?.name ?? fileName,
      assetType: fileType,
      mimeType: fileMeta.mimeType,
      size: file?.size ?? 0, // Best source is the browser File object before upload, or GCS metadata after upload.

      storage: {
        provider: "gcs", // later you could support "local", "aws", etc.
        bucket: "", // Name of the GCS bucket. Set by the backend, not frontend.\
        objectName, // Example: "services/electrical-installation/hero-image.jpg"
        generation: "", // You only get this after uploading to GCS.
        publicUrl: "", // Usually returned by backend after upload.
      },

      classification: {
        category: resolvedAssetCategory,
        usage: assetUsage, // Example: "Electrical Installation", "Hero", "Metro Bridge/gallery".
        tags: [...assetUsage.split("/")], // Example: ["electrical", "homepage", "featured"].
      },

      display: {
        alt: "", // description of the asset
        caption: "", // Optional human-facing caption shown near the asset.
        title: fileName.split(".").slice(0, -1).join("."), // Friendly display title in command center.
      },

      relationships: [
        // Links this asset to records that use it.
        {
          entityType: resolvedAssetCategory, // e.g. "service"
          entityId: resolvedFirstPath, // e.g. "electrical-installation"
          field: `${toCamelCase(targetFileType)}s`, // e.g. "images"
          role: "", // e.g. "gallery"
        },
      ],

      status: "active", // "active" = usable, "archived" = hidden, "deleted" = soft-deleted.
      createdBy: user?._id,
      updatedBy: user?._id,
      createdAt: now,
      updatedAt: now,
    };
  }, [
    fileName,
    file?.name,
    file?.size,
    fileType,
    fileMeta.mimeType,
    objectName,
    resolvedAssetCategory,
    assetUsage,
    resolvedFirstPath,
    targetFileType,
    user?._id,
  ]);

  useEffect(() => {
    setTargetAsset(computedTargetAsset);
  }, [computedTargetAsset, setTargetAsset]);

  return {
    ...mediaAssetsState,
    ...fileUploaderState,
    ...processingContext,
    ...errorContext,
    ...searchContext,
    fileType,
    targetAsset: targetAsset ?? computedTargetAsset,
  };
}
