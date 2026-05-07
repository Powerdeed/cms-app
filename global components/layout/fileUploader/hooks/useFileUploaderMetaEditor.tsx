"use client";

import { useContext } from "react";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { createAssetObjectName } from "../utils/fileConversions";
import { FileType } from "../types/fileUploader.types";

export default function useFileUploaderMetaEditor() {
  const uploaderStates = useContext(FileUploaderStateContext);
  const uploaderMeta = useContext(FileMetadataContext);

  if (!uploaderStates || !uploaderMeta)
    throw new Error("File Uploader states must be within a provider");

  const { fileName, setFileName } = uploaderStates;
  const { targetAsset, setTargetAsset, assetMode } = uploaderMeta;

  const fileExtension = fileName.includes(".")
    ? `.${fileName.split(".").pop()}`
    : "";
  const assetPath = targetAsset?.storage?.objectName ?? "";
  const previewUrl = targetAsset?.storage?.publicUrl ?? "";
  const primaryRelationship = targetAsset?.relationships?.[0];

  const updateFileName = (baseName: string) => {
    const nextName = `${baseName}${fileExtension}`;

    setFileName(nextName);
    setTargetAsset((prev) => {
      if (!prev) return prev;

      const nextObjectName =
        assetMode === "new"
          ? createAssetObjectName(
              prev.id,
              nextName,
              prev.assetType ?? ("image" as FileType),
            )
          : (prev.storage?.objectName ?? "");

      return {
        ...prev,
        name: nextName,
        storage: prev.storage
          ? {
              ...prev.storage,
              objectName: nextObjectName,
            }
          : prev.storage,
        display: {
          alt: prev.display?.alt ?? "",
          caption: prev.display?.caption ?? "",
          title: baseName,
        },
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const updateDisplayField = (field: "alt" | "caption", value: string) => {
    setTargetAsset((prev) =>
      prev
        ? {
            ...prev,
            display: {
              alt: prev.display?.alt ?? "",
              caption: prev.display?.caption ?? "",
              title: prev.display?.title ?? "",
              [field]: value,
            },
            updatedAt: new Date().toISOString(),
          }
        : prev,
    );
  };

  const updateRelationshipRole = (role: string) => {
    setTargetAsset((prev) =>
      prev
        ? {
            ...prev,
            relationships: (prev.relationships?.length
              ? prev.relationships
              : [
                  {
                    entityType: prev.classification?.category ?? "",
                    entityId: "",
                    field: "",
                    role: "",
                  },
                ]
            ).map((relationship, index) =>
              index === 0 ? { ...relationship, role } : relationship,
            ),
            updatedAt: new Date().toISOString(),
          }
        : prev,
    );
  };

  const updateIsPublic = (isPublic: boolean) => {
    setTargetAsset((prev) =>
      prev
        ? {
            ...prev,
            isPublic,
            updatedAt: new Date().toISOString(),
          }
        : prev,
    );
  };

  const fieldsToReview = [
    ["assetType", targetAsset?.assetType],
    ["size", targetAsset?.size],
    ["objectName", assetPath],
    ["mimeType", targetAsset?.mimeType],
  ];

  return {
    fileExtension,
    assetPath,
    previewUrl,
    primaryRelationship,
    updateFileName,
    updateDisplayField,
    updateRelationshipRole,
    updateIsPublic,
    fieldsToReview,
  };
}
