import { FileType } from "./fileUploader.types";

export type FileUploaderPayload = {
  file: File;
  fileName: string;
  formData: FormData;
};

export type FileUploaderProps = {
  targetFileTypes: FileType[];
  path: string;
  changeFunc: (val: string) => void;
  selectedFileName?: string;
  uploadingStatus?: boolean;
  metadata?: unknown;
  onPathChange?: (path: string) => void;
  onRename?: (fileName: string) => void;
  onReset?: () => void;
  onSubmit?: (payload: FileUploaderPayload) => void | Promise<void>;
  onUploaded?: (url: string) => void;
};
