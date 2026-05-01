export type ImageFile = {
  filename: string;
  imageUrl: string;
  file: {
    type: "Buffer";
    data: number[];
  };
  mimetype: string;
  size: number;
};
