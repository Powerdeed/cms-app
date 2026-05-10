"use client";

import { ReactNode, useEffect, useState } from "react";
import { FileType } from "../types/fileUploader.types";
import { FileUploaderStateContext } from "./FileUploaderStateContext";
import { FileUploaderProcessingContext } from "./FileUploaderProcessingContext";
import { AssetMode, FileMetadataContext } from "./FileMetadataContext";
import { Asset, AssetReference, AssetUsagePaths } from "../types/asset.types";
import { FileUploaderApiContext } from "./FileUploaderApiContext";
import { fileUploaderAssetLookUpContext } from "./FileUploaderAssetLookUpContext";
import { getAsset } from "../services/uploadFile";
import { normalizeExistingAsset } from "../utils/normalizeExistingAsset";

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
  const [newAssetId, setNewAssetId] = useState(() => crypto.randomUUID());
  const [compressing, setCompressing] = useState(false);
  const [isSupportedFile, setIsSupportedFile] = useState<boolean | null>(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [errorProcessingFile, setErrorProcessingFile] = useState(false);
  const [errorUploadingFile, setErrorUploadingFile] = useState(false);
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
  const [isAssetUpdating, setIsAssetUpdating] = useState(false);
  const [isAssetDeleting, setIsAssetDeleting] = useState(false);
  const [isAssetDownloading, setIsAssetDownloading] = useState(false);
  const [searchedAsset, setSearchedAsset] = useState("");
  const [assetReference, setAssetReference] = useState<AssetReference | null>(
    null,
  );
  const [lookingUpAsset, setLookingUpAsset] = useState(false);
  const [assetLookUpError, setAssetLookUpError] = useState("");
  useEffect(() => {
    if (!selectedAssetId) return;

    const loadSelectedAsset = async () => {
      try {
        const asset = await getAsset(selectedAssetId);
        const normalizedAsset = normalizeExistingAsset(asset);
        const primaryReference = normalizedAsset.references?.[0];
        const [selectedFirstPath = "", selectedSecondPath = ""] =
          primaryReference?.usage.split("/").filter(Boolean) ?? [];

        setAssetMode("existing");
        setFileName(normalizedAsset.name);
        setAssetCategory(primaryReference?.category ?? "");
        setAssetUsage(primaryReference?.usage ?? "");
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
    <fileUploaderAssetLookUpContext.Provider
      value={{
        searchedAsset,
        setSearchedAsset,
        assetReference,
        setAssetReference,
        lookingUpAsset,
        setLookingUpAsset,
        assetLookUpError,
        setAssetLookUpError,
      }}
    >
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
            newAssetId,
            setNewAssetId,
          }}
        >
          <FileUploaderProcessingContext.Provider
            value={{
              compressing,
              setCompressing,
              isSupportedFile,
              setIsSupportedFile,
              compressionProgress,
              setCompressionProgress,
              errorProcessingFile,
              setErrorProcessingFile,
              errorUploadingFile,
              setErrorUploadingFile,
              errorUploadingFileMsg,
              setErrorUploadingFileMsg,
            }}
          >
            <FileUploaderApiContext.Provider
              value={{
                isAssetUploading,
                setIsAssetUploading,
                isAssetUpdating,
                setIsAssetUpdating,
                isAssetDeleting,
                setIsAssetDeleting,
                isAssetDownloading,
                setIsAssetDownloading,
                assetApiOnError,
                setAssetApiOnError,
              }}
            >
              {children}
            </FileUploaderApiContext.Provider>
          </FileUploaderProcessingContext.Provider>
        </FileUploaderStateContext.Provider>
      </FileMetadataContext.Provider>
    </fileUploaderAssetLookUpContext.Provider>
  );
}
