"use client";

import { useContext, useEffect } from "react";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { MediaAssetsSearchContext } from "../context/MediaAssetsSearchContext";
import {
  FileUploaderStateContext,
  getAssetReferences,
} from "@global components/layout/fileUploader";

export default function useAssetsSearchToolBar() {
  const assetsContext = useContext(MediaAssetsStateContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const assetsSearchContext = useContext(MediaAssetsSearchContext);

  if (!assetsContext || !fileUploaderState || !assetsSearchContext)
    throw new Error("context must be used within a provider");

  const { allMediaAssets, setMediaAssets } = assetsContext;
  const { targetFileType } = fileUploaderState;

  const { searchQuery } = assetsSearchContext;

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    setMediaAssets(
      allMediaAssets.filter((asset) => {
        const assetType = asset.assetType ?? asset.type;
        const matchesType =
          targetFileType === "All" || assetType === targetFileType;

        if (!matchesType) return false;
        if (!query) return true;

        const referenceText = getAssetReferences(asset)
          .map((reference) =>
            [
              reference.label,
              reference.category,
              reference.usage,
              reference.role,
              reference.field,
            ]
              .filter(Boolean)
              .join(" "),
          )
          .join(" ");

        return [
          asset.name,
          asset.originalName,
          asset.fullPath,
          asset.storage?.objectName,
          asset.display?.title,
          referenceText,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      }),
    );
  }, [allMediaAssets, searchQuery, setMediaAssets, targetFileType]);

  return {};
}
