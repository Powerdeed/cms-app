"use client";

import { ReactNode, useState } from "react";
import { FileType } from "../types/fileUploader.types";
import { FileUploaderStateContext } from "./FileUploaderStateContext";
import { FileUploaderProcessingContext } from "./FileUploaderProcessingContext";
import { FileUploaderErrorContext } from "./FileUploaderErrorContext";
import { AssetMode, FileMetadataContext } from "./FileMetadataContext";
import { Asset, AssetUsagePaths } from "../types/asset.types";
import { AssetRefHandler } from "./FileUploaderStateContext";
import { FileUploaderApiContext } from "./FileUploaderApiContext";

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
