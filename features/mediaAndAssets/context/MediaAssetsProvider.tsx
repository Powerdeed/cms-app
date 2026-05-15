"use client";

import { useEffect, useState } from "react";
import { MediaAssetsStateContext } from "./MediaAssetsStateContext";
import { Asset } from "@global components/layout/fileUploader";
import { MediaAssetsSearchContext } from "./MediaAssetsSearchContext";
import { getAssets } from "@global components/layout/fileUploader/services/uploadFile";
import { normalizeExistingAsset } from "@global components/layout/fileUploader/utils/normalizeExistingAsset";

export default function MediaAssetsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allMediaAssets, setAllMediaAssets] = useState<Asset[]>([]);
  const [mediaAssets, setMediaAssets] = useState<Asset[]>([]);
  const [fetchingMediaAssets, setFetchingMediaAssets] = useState(true);
  const [deletingAssetIds, setDeletingAssetIds] = useState<string[]>([]);
  const [downloadingAssetIds, setDownloadingAssetIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      setFetchingMediaAssets(true);

      try {
        const normalizedAssets = (await getAssets()).map(normalizeExistingAsset);

        setAllMediaAssets(normalizedAssets);
        setMediaAssets(normalizedAssets);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchingMediaAssets(false);
      }
    };

    loadAssets();
  }, []);

  return (
    <MediaAssetsStateContext.Provider
      value={{
        allMediaAssets,
        setAllMediaAssets,
        mediaAssets,
        setMediaAssets,
        fetchingMediaAssets,
        setFetchingMediaAssets,
        deletingAssetIds,
        setDeletingAssetIds,
        downloadingAssetIds,
        setDownloadingAssetIds,
        showDeleteOptions,
        setShowDeleteOptions,
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
