"use client";

// hooks
import { useContext, useEffect, useMemo } from "react";

// custom hooks
import { globalContext } from "@globals";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";

// utils
import { createAssetObjectName, mediaType } from "../utils/fileConversions";

// types
import { Asset } from "../types/asset.types";
import { FileType } from "../types/fileUploader.types";

export default function useNewAsset() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const globalStates = useContext(globalContext);

  if (
    !fileMetadataState ||
    !fileUploaderState ||
    !processingContext ||
    !globalStates
  ) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  const { user } = globalStates;
  const { setTargetAsset, assetMode } = fileMetadataState;
  const { defaultIsPublic, file, fileName, newAssetId } = fileUploaderState;

  const fileMeta =
    fileName !== ""
      ? mediaType(fileName)
      : { type: "image" as const, mimeType: "image/jpeg" };

  const fileType: FileType =
    fileMeta.type === "unknown" ? "image" : fileMeta.type;

  const objectName = createAssetObjectName(newAssetId, fileName, fileType);

  const computedTargetAsset: Asset | null = useMemo(() => {
    if (!file && !fileName) return null;

    const now = new Date().toISOString();
    const updatedBy = user?._id ?? "";

    return {
      id: newAssetId,
      name: fileName,
      originalName: file?.name || fileName,
      assetType: fileType,
      mimeType: fileMeta.mimeType,
      size: file?.size ?? 0,
      type: fileType,
      storage: {
        provider: "gcs",
        bucket: "",
        objectName,
        generation: "",
        publicUrl: "",
      },
      fullPath: objectName,
      uploadDate: now,
      tags: [],
      display: {
        alt: "",
        caption: "",
        title: fileName.split(".").slice(0, -1).join("."),
      },
      relationships: [],
      references: [],
      status: "active",
      isPublic: defaultIsPublic,
      createdBy: user?._id,
      updatedBy,
      createdAt: now,
      updatedAt: now,
    };
  }, [
    file,
    fileName,
    newAssetId,
    fileType,
    fileMeta.mimeType,
    objectName,
    defaultIsPublic,
    user?._id,
  ]);

  useEffect(() => {
    if (assetMode !== "new") return;
    if (!computedTargetAsset) return;

    setTargetAsset(computedTargetAsset);
  }, [assetMode, computedTargetAsset, setTargetAsset]);

  return {
    fileType,
    computedTargetAsset,
  };
}
