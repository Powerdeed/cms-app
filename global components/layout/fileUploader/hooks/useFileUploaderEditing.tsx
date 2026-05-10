"use client";

import { useContext, useEffect } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";
import { FileType } from "../types/fileUploader.types";
import useFileMetadataError from "./useFileUploaderErrors";
import { createAssetObjectName } from "../utils/fileConversions";

export default function useFileUploaderEditing() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);

  if (!fileMetadataState || !fileUploaderState || !processingContext) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  const { targetAsset, setTargetAsset, assetMode, setAssetMode } =
    fileMetadataState;
  const { file, setFile, fileName, setNewAssetId, targetFileTypes } =
    fileUploaderState;
  const { setIsSupportedFile } = processingContext;

  const { resetErrors } = useFileMetadataError();

  const fileType: FileType | "unknown" = targetAsset?.assetType ?? "unknown";
  const storageFileType: FileType = fileType === "unknown" ? "image" : fileType;

  const handleResetAssetStates = (reason: "cancel" | "re-upload") => {
    setNewAssetId(crypto.randomUUID());
    resetErrors();
    setFile(null);

    if (reason === "cancel") {
      setAssetMode(null);
      setTargetAsset(null);
    } else if (reason === "re-upload") {
      setAssetMode("new");
      setTargetAsset(null);
    }
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
      prev && assetMode
        ? {
            ...prev,
            name: fileName,
            fullPath:
              assetMode === "existing"
                ? prev.fullPath
                : createAssetObjectName(prev.id, fileName, storageFileType),
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
            tags: prev.tags ?? [],
            display: {
              alt: prev.display?.alt ?? "",
              caption: prev.display?.caption ?? "",
              title: fileName.split(".").slice(0, -1).join("."),
            },
            updatedAt: new Date().toISOString(),
          }
        : prev,
    );
  }, [fileName, assetMode, storageFileType, setTargetAsset]);

  return { handleResetAssetStates };
}
