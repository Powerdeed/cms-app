"use client";

import useAssetUpload from "./useAssetsUpload";
import useAssetsSearch from "./useAssetsSearch";
import useAssetsState from "./useAssetsState";
import useAssetApi from "./useAssetApi";

export default function useAssets() {
  const state = useAssetsState();
  const upload = useAssetUpload();
  const search = useAssetsSearch();
  const api = useAssetApi();

  return {
    state,
    actions: {
      ...upload,
      ...search,
      ...api,
    },
  };
}
