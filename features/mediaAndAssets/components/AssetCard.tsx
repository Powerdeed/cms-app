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
  const { uploaderState, uploaderActions } = useFileUploader();
  const { actions } = useMediaAssets();
  const assetType = asset.assetType ?? asset.type ?? "image";
  const assetUsage = asset.classification?.usage ?? asset.usage ?? "";
  const references = getAssetReferences(asset);
  const isLinked = references.length > 0;

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
              {asset.name}
            </div>

            <div className="text-style__small-text text-(--secondary-grey)">
              {sizeOfFile(asset.size)}
            </div>
          </div>

          <div className="h-fit text-center text-style__small-text px-2 py-1 rounded-[10px] border border-(--secondary-blue) text-(--secondary-blue)">
            {isLinked ? `${references.length} linked` : "Unlinked"}
          </div>
        </div>

        <div className="w-full text-center text-style__small-text px-2 py-1 rounded-[10px] border border-(--terciary-grey)">
          {assetType}
        </div>

        <SeparatorLine />

        <div className="text-style__small-text h-8 overflow-hidden">
          <span className="font-bold">Used in: </span>
          {assetUsage}
        </div>

        <div className="text-style__small-text text-(--secondary-grey)">
          Updated on: {getDateFormatted(asset.updatedAt)}
        </div>
      </div>

      <div
        className="flex justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <ButtonLight
          buttonText="Download"
          clickAction={() => {}}
          icon={<FontAwesomeIcon icon={["fas", "download"]} />}
        />

        <ButtonLight
          buttonText="Delete"
          clickAction={() =>
            isLinked
              ? actions.handleDeletePopUp(asset)
              : actions.handleDeleteAsset(asset, "block")
          }
        >
          {uploaderState.isAssetDeleting && <Loader />}
        </ButtonLight>
      </div>
    </div>
  );
}
