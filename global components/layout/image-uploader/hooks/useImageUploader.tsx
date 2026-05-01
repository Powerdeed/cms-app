"use client";

import useError from "@features/mediaAndAssets/hooks/useAssetsError";
import useImagePaths from "./useImagePaths";
import useImageState from "./useImageState";
import useImageHandlers from "./useImageHandlers";
import useImageUploaderApi from "./useImageApi";

export default function useImageUploader() {
  const imageUploaderState = useImageState();
  const errors = useError();
  const paths = useImagePaths();
  const handlers = useImageHandlers();
  const api = useImageUploaderApi();

  return {
    imageUploaderState,
    imageUploaderActions: { ...errors, ...paths, ...handlers, ...api },
  };
}
