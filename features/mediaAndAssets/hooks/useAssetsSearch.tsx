"use client";

import { useContext, useEffect } from "react";

import { getMediaAssets } from "../services/mediaAssets";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { MediaAssetsSearchContext } from "../context/MediaAssetsSearchContext";

export default function useAssetsSearchToolBar() {
  const assetsContext = useContext(MediaAssetsStateContext);
  const assetsSearchContext = useContext(MediaAssetsSearchContext);

  if (!assetsContext || !assetsSearchContext)
    throw new Error("context must be used within a provider");

  const { targetAssetType, setMediaAssets } = assetsContext;

  const { searchQuery } = assetsSearchContext;

  useEffect(() => {
    if (targetAssetType === "All") {
      setMediaAssets(getMediaAssets());
    } else {
      setMediaAssets(
        getMediaAssets().filter((asset) => asset.type === targetAssetType),
      );
    }
  }, [setMediaAssets, targetAssetType]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    setMediaAssets(
      getMediaAssets().filter(
        (asset) =>
          asset.name.toLowerCase().includes(query) ||
          asset.usage.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery, setMediaAssets]);

  return {};
}
