"use client";

import { ReactNode, useEffect, useState } from "react";
import { FileType } from "../types/fileUploader.types";
import { FileUploaderStateContext } from "./FileUploaderStateContext";
import { FileUploaderProcessingContext } from "./FileUploaderProcessingContext";
import { FileUploaderErrorContext } from "./FileUploaderErrorContext";
import { AssetMode, FileMetadataContext } from "./FileMetadataContext";
import { Asset, AssetUsagePaths } from "../types/asset.types";
import { AssetRefHandler } from "./FileUploaderStateContext";
import { FileUploaderApiContext } from "./FileUploaderApiContext";
import { getAsset } from "../services/uploadFile";

const normalizeExistingAsset = (asset: Asset): Asset => {
  const assetType = asset.assetType ?? asset.type ?? "image";
  const objectName = asset.storage?.objectName ?? asset.fullPath ?? "";
  const category = asset.classification?.category ?? asset.category ?? "";
  const usage = asset.classification?.usage ?? asset.usage ?? "";

  return {
    ...asset,
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
        asset.display?.title ?? asset.name.split(".").slice(0, -1).join("."),
    },
    relationships: asset.relationships ?? [],
    references:
      asset.references?.map((reference) => ({
        ...reference,
        id:
          reference.id ||
          `${reference.category}-${reference.usage}-${reference.entityId ?? ""}-${reference.field ?? ""}`,
        category: reference.category || reference.entityType || "",
        usage: reference.usage || reference.entityId || "",
      })) ?? [],
    isPublic: asset.isPublic ?? false,
  };
};

export default function FileUploaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [targetFileType, setTargetFileType] = useState<FileType | "All">("All");
  const [targetFileTypes, setTargetFileTypes] = useState<FileType[]>([
    "image",
    "diagram",
    "document",
  ]);
  const [defaultIsPublic, setDefaultIsPublic] = useState(false);
  const [hasFeaturePath, setHasFeaturePath] = useState(false);
  const [featurePath, setFeaturePath] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [newAssetId, setNewAssetId] = useState(() => crypto.randomUUID());
  const [assetRef, setAssetRef] = useState<AssetRefHandler | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [isSupportedFile, setIsSupportedFile] = useState<boolean | null>(null);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [errorProcessingFile, setErrorProcessingFile] = useState(false);
  const [errorUploadingFile, setErrorUploadingFile] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [errorUploadingFileMsg, setErrorUploadingFileMsg] = useState("");
  const [targetAsset, setTargetAsset] = useState<Asset | null>(null);
  const [assetMode, setAssetMode] = useState<AssetMode>(null);
  const [copying, setCopying] = useState(false);
  const [assetUsagePaths, setAssetUsagePaths] =
    useState<AssetUsagePaths | null>(null);
  const [firstPathArr, setFirstPathArr] = useState<string[]>([]);
  const [assetCategory, setAssetCategory] = useState("");
  const [firstPath, setFirstPath] = useState("");
  const [secondPaths, setSecondPaths] = useState([""]);
  const [secondPath, setSecondPath] = useState("");
  const [assetUsage, setAssetUsage] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [assetApiOnError, setAssetApiOnError] = useState("");
  const [isAssetUploading, setIsAssetUploading] = useState(false);
  const [isAssetDeleting, setIsAssetDeleting] = useState(false);

  useEffect(() => {
    if (!selectedAssetId) return;

    const loadSelectedAsset = async () => {
      try {
        const asset = await getAsset(selectedAssetId);
        const normalizedAsset = normalizeExistingAsset(asset);
        const [selectedFirstPath = "", selectedSecondPath = ""] =
          normalizedAsset.classification?.usage.split("/").filter(Boolean) ??
          [];

        setAssetMode("existing");
        setFileName(normalizedAsset.name);
        setAssetCategory(normalizedAsset.classification?.category ?? "");
        setAssetUsage(normalizedAsset.classification?.usage ?? "");
        setFirstPath(selectedFirstPath);
        setSecondPath(selectedSecondPath);
        setTargetAsset(normalizedAsset);
      } catch (error) {
        console.error(error);
      }
    };

    loadSelectedAsset();
  }, [selectedAssetId]);

  return (
    <FileMetadataContext.Provider
      value={{
        targetAsset,
        setTargetAsset,
        assetMode,
        setAssetMode,
        copying,
        setCopying,
        assetUsagePaths,
        setAssetUsagePaths,
        firstPathArr,
        setFirstPathArr,
        assetCategory,
        setAssetCategory,
        firstPath,
        setFirstPath,
        secondPaths,
        setSecondPaths,
        secondPath,
        setSecondPath,
        assetUsage,
        setAssetUsage,
        selectedAssetId,
        setSelectedAssetId,
      }}
    >
      <FileUploaderStateContext.Provider
        value={{
          file,
          setFile,
          fileName,
          setFileName,
          targetFileType,
          setTargetFileType,
          targetFileTypes,
          setTargetFileTypes,
          defaultIsPublic,
          setDefaultIsPublic,
          hasFeaturePath,
          setHasFeaturePath,
          featurePath,
          setFeaturePath,
          uploadedFile,
          setUploadedFile,
          newAssetId,
          setNewAssetId,
          assetRef,
          setAssetRef,
        }}
      >
        <FileUploaderProcessingContext.Provider
          value={{
            compressing,
            setCompressing,
            isSupportedFile,
            setIsSupportedFile,
            uploadingStatus,
            setUploadingStatus,
            compressionProgress,
            setCompressionProgress,
          }}
        >
          <FileUploaderErrorContext.Provider
            value={{
              errorProcessingFile,
              setErrorProcessingFile,
              errorUploadingFile,
              setErrorUploadingFile,
              uploadingFile,
              setUploadingFile,
              errorUploadingFileMsg,
              setErrorUploadingFileMsg,
            }}
          >
            <FileUploaderApiContext.Provider
              value={{
                isAssetUploading,
                setIsAssetUploading,
                isAssetDeleting,
                setIsAssetDeleting,
                assetApiOnError,
                setAssetApiOnError,
              }}
            >
              {children}
            </FileUploaderApiContext.Provider>
          </FileUploaderErrorContext.Provider>
        </FileUploaderProcessingContext.Provider>
      </FileUploaderStateContext.Provider>
    </FileMetadataContext.Provider>
  );
}
