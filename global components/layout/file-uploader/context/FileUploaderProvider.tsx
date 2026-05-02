"use client";

import { ReactNode, useState } from "react";
import { FileType } from "../types/fileUploader.types";
import { FileUploaderStateContext } from "./FileUploaderStateContext";
import { FileUploaderProcessingContext } from "./FileUploaderProcessingContext";
import { FileUploaderErrorContext } from "./FileUploaderErrorContext";

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
  const [hasFeaturePath, setHasFeaturePath] = useState(false);
  const [featurePath, setFeaturePath] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [compressing, setCompressing] = useState(false);
  const [isSupportedFile, setIsSupportedFile] = useState<boolean | null>(null);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [errorProcessingFile, setErrorProcessingFile] = useState(false);
  const [errorUploadingFile, setErrorUploadingFile] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [errorUploadingFileMsg, setErrorUploadingFileMsg] = useState("");

  return (
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
        hasFeaturePath,
        setHasFeaturePath,
        featurePath,
        setFeaturePath,
        uploadedFile,
        setUploadedFile,
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
          {children}
        </FileUploaderErrorContext.Provider>
      </FileUploaderProcessingContext.Provider>
    </FileUploaderStateContext.Provider>
  );
}
