import { Asset, AssetLink, FeaturedImageLink } from "../types/asset.types";

export const getAssetLinkId = (assetLink: AssetLink) => assetLink[0];

export const isAssetLink = (assetLink: unknown): assetLink is AssetLink =>
  Array.isArray(assetLink) &&
  assetLink.length === 4 &&
  assetLink.every((value) => typeof value === "string");

export const createAssetLink = (asset: Asset): AssetLink => [
  asset.id,
  asset.name || asset.originalName,
  asset.storage?.publicUrl ?? asset.url ?? "no link found",
  asset.assetType ?? asset.type ?? "image",
];

export const createFeaturedImageLink = (asset: Asset): FeaturedImageLink => ({
  assetId: asset.id,
  fileName: asset.name,
  fileUrl: asset.storage?.publicUrl ?? asset.url ?? "",
  assetType: asset.assetType ?? asset.type ?? "image",
});

export const isFeaturedImageLink = (
  image: unknown,
): image is FeaturedImageLink =>
  typeof image === "object" &&
  image !== null &&
  !Array.isArray(image) &&
  typeof (image as FeaturedImageLink).assetId === "string" &&
  typeof (image as FeaturedImageLink).fileName === "string" &&
  typeof (image as FeaturedImageLink).fileUrl === "string" &&
  typeof (image as FeaturedImageLink).assetType === "string";

export const getFeaturedImageLinkId = (image: FeaturedImageLink) =>
  image.assetId;

export const addAssetLink = (assetLinks: AssetLink[], asset: Asset) => {
  const assetExists = assetLinks.some(
    (assetLink) => getAssetLinkId(assetLink) === asset.id,
  );

  if (assetExists) return assetLinks;

  return [...assetLinks, createAssetLink(asset)];
};

export const removeAssetLink = (assetLinks: AssetLink[], assetId: string) =>
  assetLinks.filter((assetLink) => getAssetLinkId(assetLink) !== assetId);

export const renameAssetLink = (assetLinks: AssetLink[], asset: Asset) =>
  assetLinks.map((assetLink) =>
    getAssetLinkId(assetLink) === asset.id
      ? ([
          asset.id,
          asset.name,
          asset.storage?.publicUrl ?? asset.url ?? assetLink[2],
          asset.assetType ?? asset.type ?? assetLink[3],
        ] as AssetLink)
      : assetLink,
  );

export const renameFeaturedImageLink = (
  image: string | FeaturedImageLink,
  asset: Asset,
) => {
  if (!isFeaturedImageLink(image) || image.assetId !== asset.id) {
    return image;
  }

  return createFeaturedImageLink(asset);
};
