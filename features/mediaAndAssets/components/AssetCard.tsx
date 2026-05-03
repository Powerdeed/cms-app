"use client";

import { SeparatorLine } from "@global components/layout/FormWrapper";
import { ButtonLight } from "@global components/ui/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Asset, useFileUploader } from "@global components/layout/fileUploader";

import { ICON_COLORS } from "../constants/iconColors";

type AssetCardProps = {
  asset: Asset;
};

export default function AssetCard({ asset }: AssetCardProps) {
  const { uploaderState, uploaderActions } = useFileUploader();
  const assetType = asset.assetType ?? asset.type ?? "image";
  const assetUsage = asset.classification?.usage ?? asset.usage ?? "";
  const uploadDate =
    asset.createdAt ?? asset.uploadDate ?? new Date().toISOString();
  const readableSize =
    typeof asset.size === "number"
      ? `${(asset.size / 1000000).toFixed(2)} MB`
      : asset.size;

  return (
    <div
      className="p-5 vertical-layout__inner border border-(--terciary-grey)/40 hover:border-(--secondary-blue) hover:bg-(--secondary-blue)/5 rounded-[10px]"
      onClick={() => {
        uploaderState.setAssetMode("existing");
        uploaderActions.handleTargetAsset("existing", asset);
      }}
    >
      <div className="vertical-layout__inner">
        <div className="flex gap-2.5 h-12">
          <div>
            <FontAwesomeIcon
              icon={["fas", assetType === "document" ? "file-lines" : "image"]}
              className={`text-style__heading p-3 bg-(--terciary-grey)/30 rounded-[10px] ${ICON_COLORS[assetType]}`}
            />
          </div>

          <div>
            <div className="w-full h-8 text-style__small-text--bold overflow-hidden">
              {asset.name}
            </div>

            <div className="text-style__small-text text-(--secondary-grey)">
              {readableSize}
            </div>
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
          Uploaded {uploadDate}
        </div>
      </div>

      <div className="flex justify-between">
        <ButtonLight
          buttonText="Download"
          clickAction={() => {}}
          icon={<FontAwesomeIcon icon={["fas", "download"]} />}
        />

        <ButtonLight buttonText="Delete" clickAction={() => {}} />
      </div>
    </div>
  );
}
