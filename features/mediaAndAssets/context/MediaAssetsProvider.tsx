"use client";

import { useEffect, useState } from "react";
import { MediaAssetsStateContext } from "./MediaAssetsStateContext";
import { Asset } from "@global components/layout/fileUploader";
import { MediaAssetsSearchContext } from "./MediaAssetsSearchContext";
import { getAssets } from "@global components/layout/fileUploader/services/uploadFile";

export default function MediaAssetsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mediaAssets, setMediaAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setMediaAssets(await getAssets());
      } catch (error) {
        console.error(error);
      }
    };

    loadAssets();
  }, []);

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
