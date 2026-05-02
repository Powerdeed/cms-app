"use client";

import { useContext, useEffect } from "react";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";

import {
  FileType,
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/file-uploader";
import useError from "./useAssetsError";

export default function useAssetsEditing() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);

  if (!mediaAssetsState || !fileUploaderState || !processingContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
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
  } = mediaAssetsState;

  const { file, setFile, fileName, setFileName, targetFileTypes } =
    fileUploaderState;

  const { setIsSupportedFile } = processingContext;

  const { resetErrors } = useError();

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
