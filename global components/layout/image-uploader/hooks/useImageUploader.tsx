"use client";

import useError from "@features/mediaAndAssets/hooks/useAssetsError";
import useImagePaths from "./useImagePaths";
import useImageState from "./useImageState";
import useImageHandlers from "./useImageHandlers";

export default function useImageUploader() {
  const imageUploaderState = useImageState();
  const errors = useError();
  const paths = useImagePaths();
  const handlers = useImageHandlers();

  return { imageUploaderState, actions: { ...errors, ...paths, ...handlers } };
}
