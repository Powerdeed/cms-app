"use client";

import FileUploaderView from "./FileUploaderView";
import { FileUploaderProps } from "../types/fileUploader.props";

export default function FileUploader(props: FileUploaderProps) {
  return <FileUploaderView {...props} />;
}
