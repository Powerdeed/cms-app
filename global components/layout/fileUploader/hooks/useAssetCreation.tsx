"use client";

import { useCallback, useContext, useEffect, useRef } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { RawAsset } from "../types/asset.types";
import useFileMetadataPaths from "./useAssetPaths";
import useFileUploaderNewAsset from "./useNewAsset";
import { normalizeExistingAsset } from "../utils/normalizeExistingAsset";

export default function useAssetCreation() {
  const fileMetadataState = useContext(FileMetadataContext);

  if (!fileMetadataState) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  const { setTargetAsset, setAssetMode } = fileMetadataState;
  const { updatePathSetters } = useFileMetadataPaths();
  const { computedTargetAsset } = useFileUploaderNewAsset();
  const computedTargetAssetRef = useRef(computedTargetAsset);

  useEffect(() => {
    computedTargetAssetRef.current = computedTargetAsset;
  }, [computedTargetAsset]);

  const handleTargetAsset = useCallback(
    (mode: "new" | "existing", asset?: RawAsset) => {
      setAssetMode(mode);
      const pathData = updatePathSetters(asset);

      if (mode === "new") {
        setTargetAsset(computedTargetAssetRef.current);
      } else if (mode === "existing" && asset) {
        setTargetAsset(
          normalizeExistingAsset(asset, {
            relationshipEntityId: pathData.firstPath,
          }),
        );
      }
    },
    [setAssetMode, setTargetAsset, updatePathSetters],
  );

  return { handleTargetAsset };
}
