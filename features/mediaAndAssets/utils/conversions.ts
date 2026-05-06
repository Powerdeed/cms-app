export {
  mediaType,
  sizeOfFile,
  toCamelCase,
} from "@global components/layout/fileUploader";

export const getTotalUsedSpace = () => {
  // const total = getMediaAssets().reduce((acc, asset) => {
  //   if (typeof asset.size === "number") return acc + asset.size / 1000000;
  //   const [value, unit] = asset.size.split(" ");
  //   let sizeInMB = Number(value);
  //   if (unit === "KB") sizeInMB /= 1024;
  //   if (unit === "GB") sizeInMB *= 1024;
  //   return acc + sizeInMB;
  // }, 0);
  // return parseFloat(total.toFixed(2));
  return 0;
};
