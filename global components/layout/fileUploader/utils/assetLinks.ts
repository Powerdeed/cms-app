import { Asset, AssetLink } from "../types/asset.types";

export const getAssetLinkId = (assetLink: AssetLink) => assetLink[0];

export const createAssetLink = (asset: Asset): AssetLink => [
  asset.id,
  asset.name,
  asset.storage?.publicUrl ?? asset.url ?? "",
];

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
        ] as AssetLink)
      : assetLink,
  );
