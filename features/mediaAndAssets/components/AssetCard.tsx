"use client";

import { SeparatorLine } from "@global components/layout/FormWrapper";
import { ButtonLight } from "@global components/ui/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Asset } from "../types/mediaAssets.types";

import { ICON_COLORS } from "../constants/iconColors";

import useMediaAssets from "../hooks/useAssets";

type AssetCardProps = {
  asset: Asset;
};

export default function AssetCard({ asset }: AssetCardProps) {
  const { state, actions } = useMediaAssets();

  return (
    <div
      className="p-5 vertical-layout__inner border border-(--terciary-grey)/40 hover:border-(--secondary-blue) hover:bg-(--secondary-blue)/5 rounded-[10px]"
      onClick={() => {
        state.setAssetMode("existing");
        actions.handleCurrentAsset("existing", asset);
      }}
    >
      <div className="vertical-layout__inner">
        <div className="flex gap-2.5 h-12">
          <div>
            <FontAwesomeIcon
              icon={["fas", asset.type === "document" ? "file-lines" : "image"]}
              className={`text-style__heading p-3 bg-(--terciary-grey)/30 rounded-[10px] ${ICON_COLORS[asset.type]}`}
            />
          </div>

          <div>
            <div className="w-full h-8 text-style__small-text--bold overflow-hidden">
              {asset.name}
            </div>

            <div className="text-style__small-text text-(--secondary-grey)">
              {asset.size}
            </div>
          </div>
        </div>

        <div className="w-full text-center text-style__small-text px-2 py-1 rounded-[10px] border border-(--terciary-grey)">
          {asset.type}
        </div>

        <SeparatorLine />

        <div className="text-style__small-text h-8 overflow-hidden">
          <span className="font-bold">Used in: </span>
          {asset.usage}
        </div>

        <div className="text-style__small-text text-(--secondary-grey)">
          Uploaded {asset.uploadDate}
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
