"use client";

import { useContext } from "react";
import { MediaAssetsSearchContext } from "../context/MediaAssetsSearchContext";
import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";

export default function useAssetsState() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const searchContext = useContext(MediaAssetsSearchContext);

  if (!mediaAssetsState || !searchContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  return {
    ...mediaAssetsState,
    ...searchContext,
  };
}
