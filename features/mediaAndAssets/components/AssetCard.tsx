"use client";

// modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { SeparatorLine } from "@global components/layout/FormWrapper";
import { ButtonLight } from "@global components/ui/Button";
import {
  Asset,
  getAssetReferences,
  sizeOfFile,
  useFileUploader,
} from "@global components/layout/fileUploader";
import Loader from "@global components/ui/Loader";

// constants
import { ICON_COLORS } from "../constants/iconColors";

// hooks
import useMediaAssets from "../hooks/useAssets";

// utils
import { getDateFormatted } from "@globals";

type AssetCardProps = {
  asset: Asset;
};

export default function AssetCard({ asset }: AssetCardProps) {
  const { uploaderActions } = useFileUploader();
  const { state, actions } = useMediaAssets();
  const assetType = asset.assetType ?? asset.type ?? "image";
  const references = getAssetReferences(asset);
  const assetUsage =
    references
      .map((reference) => reference.usage)
      .filter(Boolean)
      .join(", ") || "Not linked";
  const isLinked = references.length > 0;
  const isDeletingThisAsset = state.deletingAssetIds.includes(asset.id);
  const isDownloadingThisAsset = state.downloadingAssetIds.includes(asset.id);
  const isOperatingOnThisAsset = isDeletingThisAsset || isDownloadingThisAsset;
  const updatedAt = asset.updatedAt ?? asset.uploadDate ?? asset.createdAt;

  return (
    <div
      className="p-5 vertical-layout__inner border border-(--terciary-grey)/40 hover:border-(--secondary-blue) hover:bg-(--secondary-blue)/5 rounded-[10px]"
      onClick={() => uploaderActions.handleTargetAsset("existing", asset)}
    >
      <div className="vertical-layout__inner">
        <div className="flex gap-2.5 h-12">
          <div>
            <FontAwesomeIcon
              icon={["fas", assetType === "document" ? "file-lines" : "image"]}
              className={`text-style__heading p-3 bg-(--terciary-grey)/30 rounded-[10px] ${ICON_COLORS[assetType]}`}
            />
          </div>

          <div className="flex-1">
            <div className="w-full h-8 text-style__small-text--bold overflow-hidden">
              {asset.name || asset.originalName || asset.id}
            </div>

            <div className="text-style__small-text text-(--secondary-grey)">
              {sizeOfFile(asset.size || 0)}
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 items-center text-style__small-text">
          <div className="flex-2 rounded-border border-(--terciary-grey)">
            {assetType}
          </div>

          <div className="flex-1 rounded-border border-(--secondary-blue) text-(--secondary-blue)">
            {isLinked ? `${references.length} linked` : "Unlinked"}
          </div>
        </div>

        <SeparatorLine />

        <div className="text-style__small-text h-8 overflow-hidden">
          <span className="font-bold">Used in: </span>
          {assetUsage}
        </div>

        <div className="text-style__small-text text-(--secondary-grey)">
          Updated on: {updatedAt ? getDateFormatted(updatedAt) : "Unknown"}
        </div>
      </div>

      <div
        className="flex justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <ButtonLight
          buttonText="Download"
          clickAction={() => actions.handleDownloadAsset(asset)}
          disabled={isOperatingOnThisAsset}
          icon={<FontAwesomeIcon icon={["fas", "download"]} />}
        >
          {isDownloadingThisAsset && <Loader />}
        </ButtonLight>

        <ButtonLight
          buttonText="Delete"
          clickAction={() =>
            isLinked
              ? actions.handleDeletePopUp(asset)
              : actions.handleDeleteAsset(asset, "block")
          }
          disabled={isOperatingOnThisAsset}
        >
          {isDeletingThisAsset && <Loader />}
        </ButtonLight>
      </div>
    </div>
  );
}
