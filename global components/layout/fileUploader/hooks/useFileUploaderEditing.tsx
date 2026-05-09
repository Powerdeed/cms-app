"use client";

import { useContext, useEffect } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";
import { FileType } from "../types/fileUploader.types";
import useFileMetadataError from "./useFileUploaderError";
import { createAssetObjectName, createPathUrl } from "../utils/fileConversions";

export default function useFileUploaderEditing() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);

  if (!fileMetadataState || !fileUploaderState || !processingContext) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  const {
    targetAsset,
    setTargetAsset,
    assetMode,
    setAssetMode,
    assetCategory,
    firstPath,
    secondPath,
  } = fileMetadataState;
  const { file, fileName, setNewAssetId, targetFileTypes } = fileUploaderState;
  const { setIsSupportedFile } = processingContext;
  const { resetErrors } = useFileMetadataError();

  const fileType: FileType | "unknown" = targetAsset?.assetType ?? "unknown";
  const storageFileType: FileType = fileType === "unknown" ? "image" : fileType;

  const handleResetAssetStates = (reason: "cancel" | "re-upload") => {
    setNewAssetId(crypto.randomUUID());
    resetErrors();
    setAssetMode(reason === "re-upload" ? "new" : null);
    setTargetAsset(reason === "re-upload" ? targetAsset : null);
  };

  useEffect(() => {
    const setAsset = () => {
      if (file && targetAsset) {
        setIsSupportedFile(
          targetFileTypes.includes(fileType as Exclude<FileType, "video">),
        );
      }
    };

    setAsset();
  }, [file, fileType, setIsSupportedFile, targetAsset, targetFileTypes]);

  useEffect(() => {
    setTargetAsset((prev) =>
      prev
        ? {
            ...prev,
            name: fileName,
            storage: {
              provider: "gcs",
              bucket: prev.storage?.bucket ?? "",
              objectName:
                assetMode === "existing"
                  ? (prev.storage?.objectName ?? "")
                  : createAssetObjectName(prev.id, fileName, storageFileType),
              generation: prev.storage?.generation ?? "",
              publicUrl: prev.storage?.publicUrl ?? "",
            },
            classification: {
              category: assetCategory,
              usage: firstPath ? createPathUrl([firstPath, secondPath]) : "",
              tags: prev.classification?.tags ?? [],
            },
            display: {
              alt: prev.display?.alt ?? "",
              caption: prev.display?.caption ?? "",
              title: fileName.split(".").slice(0, -1).join("."),
            },
            updatedAt: new Date().toISOString(),
          }
        : prev,
    );
  }, [
    fileName,
    assetCategory,
    firstPath,
    secondPath,
    assetMode,
    storageFileType,
    setTargetAsset,
  ]);

  return { handleResetAssetStates };
}
