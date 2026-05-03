"use client";

// hooks
import { useContext, useEffect, useMemo } from "react";

// custom hooks
import { globalContext } from "@globals";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderErrorContext } from "../context/FileUploaderErrorContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";

// utils
import { mediaType, toCamelCase } from "../utils/fileConversions";

// types
import { Asset } from "../types/asset.types";
import { FileType } from "../types/fileUploader.types";

export default function useFileUploaderNewAsset() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const errorContext = useContext(FileUploaderErrorContext);
  const globalStates = useContext(globalContext);

  if (
    !fileMetadataState ||
    !fileUploaderState ||
    !processingContext ||
    !errorContext ||
    !globalStates
  ) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  const { user } = globalStates;
  const { assetCategory, firstPath, assetUsage, setTargetAsset } =
    fileMetadataState;
  const { featurePath, file, fileName, targetFileType } = fileUploaderState;

  const featurePathParts = featurePath.split("/").filter(Boolean);
  const resolvedAssetCategory = assetCategory || featurePathParts[0] || "";
  const resolvedFirstPath = firstPath || featurePathParts[1] || "";

  const fileMeta =
    fileName !== ""
      ? mediaType(fileName)
      : { type: "image" as const, mimeType: "image/jpeg" };

  const fileType: FileType =
    fileMeta.type === "unknown" ? "image" : fileMeta.type;

  const objectName = [resolvedAssetCategory, assetUsage, fileName]
    .filter(Boolean)
    .join("/");

  const computedTargetAsset: Asset | null = useMemo(() => {
    if (!file && !fileName) return null;

    const now = new Date().toISOString();

    return {
      id: crypto.randomUUID(),
      name: fileName,
      originalName: file?.name || fileName,
      assetType: fileType,
      mimeType: fileMeta.mimeType,
      size: file?.size ?? 0,
      storage: {
        provider: "gcs",
        bucket: "",
        objectName,
        generation: "",
        publicUrl: "",
      },
      classification: {
        category: resolvedAssetCategory,
        usage: assetUsage,
        tags: assetUsage
          ? [...assetUsage.split("/"), assetCategory, fileName]
          : [],
      },
      display: {
        alt: "",
        caption: "",
        title: fileName.split(".").slice(0, -1).join("."),
      },
      relationships: [
        {
          entityType: resolvedAssetCategory,
          entityId: resolvedFirstPath,
          field: `${toCamelCase(targetFileType)}s`,
          role: "",
        },
      ],
      status: "active",
      createdBy: user?._id,
      updatedBy: user?._id,
      createdAt: now,
      updatedAt: now,
    };
  }, [
    file,
    fileName,
    fileType,
    fileMeta.mimeType,
    objectName,
    resolvedAssetCategory,
    assetUsage,
    assetCategory,
    resolvedFirstPath,
    targetFileType,
    user?._id,
  ]);

  useEffect(() => {
    if (!computedTargetAsset) return;

    setTargetAsset(computedTargetAsset);
  }, [computedTargetAsset, setTargetAsset]);

  return {
    fileType,
    computedTargetAsset,
  };
}
