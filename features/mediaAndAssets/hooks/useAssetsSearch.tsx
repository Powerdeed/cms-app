"use client";

import { useContext, useEffect } from "react";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { MediaAssetsSearchContext } from "../context/MediaAssetsSearchContext";
import { FileUploaderStateContext } from "@global components/layout/fileUploader";

export default function useAssetsSearchToolBar() {
  const assetsContext = useContext(MediaAssetsStateContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const assetsSearchContext = useContext(MediaAssetsSearchContext);

  if (!assetsContext || !fileUploaderState || !assetsSearchContext)
    throw new Error("context must be used within a provider");

  const { setMediaAssets } = assetsContext;
  const { targetFileType } = fileUploaderState;

  const { searchQuery } = assetsSearchContext;

  // useEffect(() => {
  //   if (targetFileType === "All") {
  //     setMediaAssets(getMediaAssets());
  //   } else {
  //     setMediaAssets(
  //       getMediaAssets().filter(
  //         (asset) => (asset.assetType ?? asset.type) === targetFileType,
  //       ),
  //     );
  //   }
  // }, [setMediaAssets, targetFileType]);

  // useEffect(() => {
  //   const query = searchQuery.toLowerCase();

  //   setMediaAssets(
  //     getMediaAssets().filter(
  //       (asset) =>
  //         asset.name.toLowerCase().includes(query) ||
  //         (asset.classification?.usage ?? asset.usage ?? "")
  //           .toLowerCase()
  //           .includes(query),
  //     ),
  //   );
  // }, [searchQuery, setMediaAssets]);

  return {};
}
