export type FileType = "image" | "video" | "document" | "diagram";

export type MediaTypeResult = {
  type: FileType | "unknown";
  mimeType: string;
};

export type UploadedFile = {
  filename: string;
  imageUrl: string;
  url?: string;
  storage?: {
    publicUrl?: string;
  };
  file: {
    type: "Buffer";
    data: number[];
  };
  mimetype: string;
  size: number;
};
