"use client";

import useAssetsSearch from "./useAssetsSearch";
import useAssetClipboard from "./useAssetsClipboard";
import useAssetCreation from "./useAssetsCreation";
import useAssetEditing from "./useAssetsEditing";
import useAssetUpload from "./useAssetsUpload";
import useAssetsState from "./useAssetsState";
import useAssetPaths from "./useAssetsPaths";
import useAssetError from "./useAssetsError";

export default function useAssets() {
  const state = useAssetsState();

  const creation = useAssetCreation();
  const editing = useAssetEditing();
  const upload = useAssetUpload();
  const clipboard = useAssetClipboard();
  const errors = useAssetError();
  const paths = useAssetPaths();
  const search = useAssetsSearch();

  return {
    state,
    actions: {
      ...creation,
      ...editing,
      ...upload,
      ...clipboard,
      ...errors,
      ...paths,
      ...search,
    },
  };
}
