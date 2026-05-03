"use client";

import { useContext, useEffect } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";
import { FileType } from "../types/fileUploader.types";
import useFileMetadataError from "./useFileUploaderError";

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
    setAssetMode,
    assetCategory,
    setAssetCategory,
    firstPath,
    setFirstPath,
    setFirstPathArr,
    secondPath,
    setSecondPath,
  } = fileMetadataState;
  const { file, setFile, fileName, setFileName, targetFileTypes } =
    fileUploaderState;
  const { setIsSupportedFile } = processingContext;
  const { resetErrors } = useFileMetadataError();

  const fileType: FileType | "unknown" = targetAsset?.assetType ?? "unknown";

  const handleResetAssetStates = (reason: "cancel" | "re-upload") => {
    setFile(null);
    setFileName("");
    setAssetCategory("");
    setFirstPathArr(null);
    setFirstPath("");
    setSecondPath("");
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
        setTargetAsset(targetAsset);
      }
    };

    setAsset();
  }, [
    file,
    fileType,
    targetAsset,
    setTargetAsset,
    setIsSupportedFile,
    targetFileTypes,
  ]);

  useEffect(() => {
    const assetUsage = firstPath
      ? `${firstPath}${secondPath ? `/${secondPath}` : ""}`
      : "";

    setTargetAsset((prev) =>
      prev
        ? {
            ...prev,
            name: fileName,
            storage: {
              provider: "gcs",
              bucket: prev.storage?.bucket ?? "",
              objectName: `${assetCategory}${assetUsage && "/" + assetUsage}/${fileName}`,
              generation: prev.storage?.generation ?? "",
              publicUrl: prev.storage?.publicUrl ?? "",
            },
            classification: {
              category: assetCategory,
              usage: assetUsage,
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
  }, [fileName, assetCategory, firstPath, secondPath, setTargetAsset]);

  return { handleResetAssetStates };
}
