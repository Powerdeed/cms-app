"use client";

import useAssetUpload from "./useAssetsUpload";
import useAssetsSearch from "./useAssetsSearch";
import useAssetsState from "./useAssetsState";

export default function useAssets() {
  const state = useAssetsState();
  const upload = useAssetUpload();
  const search = useAssetsSearch();

  return {
    state,
    actions: {
      ...upload,
      ...search,
    },
  };
}
