"use client";

import { useContext, useEffect } from "react";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { MediaAssetsProcessingContext } from "../context/MediaAssetsProcessingContext";

import useMediaAssetsState from "./useAssetsState";

import { Asset } from "../types/mediaAssets.types";
import useError from "./useAssetsError";

export default function useAssetsEditing() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const processingContext = useContext(MediaAssetsProcessingContext);

  if (!mediaAssetsState || !processingContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const {
    setCurrentAsset,
    file,
    setFile,
    setAssetMode,
    fileName,
    setFileName,
    assetCategory,
    setAssetCategory,
    firstPath,
    setFirstPath,
    setFirstPathArr,
    secondPath,
    setSecondPath,
  } = mediaAssetsState;

  const { setIsSupportedFile, targetFileTypes } = processingContext;

  const { resetErrors } = useError();

  const { newEmptyAsset, fileType } = useMediaAssetsState();

  const handleResetAssetStates = (reason: "cancel" | "re-upload") => {
    setFile(null);
    setFileName("");
    setAssetCategory("");
    setFirstPathArr(null);
    setFirstPath("");
    setSecondPath("");
    resetErrors();
    setAssetMode(reason === "re-upload" ? "new" : null);
    setCurrentAsset(reason === "re-upload" ? newEmptyAsset : null);
  };

  useEffect(() => {
    const setAsset = () => {
      if (file) {
        setIsSupportedFile(targetFileTypes.includes(fileType as Asset["type"]));

        setCurrentAsset(newEmptyAsset);
      }
    };

    setAsset();
  }, [
    file,
    fileType,
    newEmptyAsset,
    setCurrentAsset,
    setIsSupportedFile,
    targetFileTypes,
  ]);

  useEffect(() => {
    const assetUsage = firstPath
      ? `${firstPath}${secondPath ? `/${secondPath}` : ""}`
      : "";

    setCurrentAsset((prev) =>
      prev
        ? {
            ...prev,
            ["name"]: fileName,
            ["category"]: assetCategory,
            ["usage"]: assetUsage,
            ["fullPath"]: `${assetCategory}${assetUsage && "/" + assetUsage}/${fileName}`,
          }
        : prev,
    );
  }, [fileName, assetCategory, firstPath, secondPath, setCurrentAsset]);

  return { handleResetAssetStates };
}
