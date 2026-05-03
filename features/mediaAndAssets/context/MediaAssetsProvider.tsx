"use client";

import { useState } from "react";
import { MediaAssetsStateContext } from "./MediaAssetsStateContext";
import { Asset } from "@global components/layout/fileUploader";
import { getMediaAssets } from "../services/mediaAssets";
import { MediaAssetsSearchContext } from "./MediaAssetsSearchContext";

export default function MediaAssetsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mediaAssets, setMediaAssets] = useState<Asset[]>(getMediaAssets());
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MediaAssetsStateContext.Provider
      value={{
        mediaAssets,
        setMediaAssets,
      }}
    >
      <MediaAssetsSearchContext.Provider
        value={{
          searchQuery,
          setSearchQuery,
        }}
      >
        {children}
      </MediaAssetsSearchContext.Provider>
    </MediaAssetsStateContext.Provider>
  );
}
