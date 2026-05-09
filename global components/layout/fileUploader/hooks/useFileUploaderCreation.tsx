"use client";

import { useCallback, useContext, useEffect, useRef } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { Asset } from "../types/asset.types";
import useFileMetadataPaths from "./useFileUploaderPaths";
import useFileUploaderNewAsset from "./useFileUploaderNewAsset";

export default function useFileUploaderCreation() {
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
    (mode: "new" | "existing" | null, asset?: Asset) => {
      setAssetMode(mode);
      const pathData = updatePathSetters(asset);

      if (mode === "new") {
        setTargetAsset(computedTargetAssetRef.current);
      } else if (mode === "existing" && asset) {
        const assetType = asset.assetType ?? asset.type ?? "image";
        const objectName = asset.storage?.objectName ?? asset.fullPath ?? "";
        const category =
          asset.classification?.category ??
          asset.category ??
          pathData.category ??
          "";
        const usage =
          asset.classification?.usage ?? asset.usage ?? pathData.usage ?? "";

        setTargetAsset({
          ...asset,
          name: asset.name,
          originalName: asset.originalName ?? asset.name,
          assetType,
          mimeType: asset.mimeType ?? asset.contentType ?? "",
          storage: {
            provider: asset.storage?.provider ?? "gcs",
            bucket: asset.storage?.bucket ?? "",
            objectName,
            generation: asset.storage?.generation ?? "",
            publicUrl: asset.storage?.publicUrl ?? asset.url ?? "",
          },
          classification: {
            category,
            usage,
            tags: asset.classification?.tags ?? (usage ? usage.split("/") : []),
          },
          display: {
            alt: asset.display?.alt ?? "",
            caption: asset.display?.caption ?? "",
            title:
              asset.display?.title ??
              asset.name.split(".").slice(0, -1).join("."),
          },
          relationships: asset.relationships ?? [
            {
              entityType: category,
              entityId: pathData.firstPath,
              field: "",
              role: "",
            },
          ],
          isPublic: asset.isPublic ?? false,
        });
      }
    },
    [setAssetMode, setTargetAsset, updatePathSetters],
  );

  return { handleTargetAsset };
}
