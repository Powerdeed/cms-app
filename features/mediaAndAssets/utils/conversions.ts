export {
  mediaType,
  sizeOfFile,
  toCamelCase,
} from "@global components/layout/fileUploader";
import { Asset } from "@global components/layout/fileUploader";

export const getTotalUsedSpace = (assets: Asset[] = []) => {
  const totalBytes = assets.reduce((acc, asset) => acc + (asset.size || 0), 0);

  return (totalBytes / 1000000).toFixed(2);
};
