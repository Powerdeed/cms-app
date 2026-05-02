"use client";

// components
import FormWrapper from "@global components/layout/FormWrapper";
import Button, { ButtonLight } from "@global components/ui/Button";
import SearchBar from "@global components/ui/SearchBar";

// feature components
import AssetCard from "../components/AssetCard";
import DropZone from "../components/DropZone";
import AssetMetaEditor from "../components/AssetMetaEditor";
import AssetHandlingError from "../components/AssetHandlingError";
import CompressingAsset from "../components/CompressingAsset";

// utils
import { getTotalUsedSpace, toCamelCase } from "../utils/conversions";

// hooks
import useMediaAssets from "../hooks/useAssets";

// constants
import { PAGE_META } from "../constants/pageMeta";
import { supportedAssetTypes } from "../constants/supportedAssetTypes";

export function MediaAssetsView() {
  const { state, actions } = useMediaAssets();

  return (
    <div className="relative page-layout">
      <FormWrapper
        title={PAGE_META.title}
        subtitle={PAGE_META.subtitle}
        subtitleChildren={
          <Button
            buttonText="Upload Files"
            clickAction={() => actions.handleTargetAsset("new")}
          />
        }
      >
        <div className="feature-container-horizontal">
          <SearchBar
            val={state.searchQuery}
            placeholder="Search assets..."
            changeFunc={(val) => state.setSearchQuery(val)}
          />

          {["All", ...supportedAssetTypes].map((category) => (
            <ButtonLight
              key={category}
              buttonText={category}
              clickAction={() =>
                state.setTargetFileType(category as typeof state.targetFileType)
              }
            />
          ))}
        </div>

        <div className="feature-container-vertical">
          <FormWrapper
            subtitle={`${state.targetFileType === "All" ? "All Assets" : `${toCamelCase(state.targetFileType)}s`} (${state.mediaAssets.length})`}
            subtitleChildren={
              <div className="text-(terciary-grey) text-style__small-text">
                Total Storage: {getTotalUsedSpace()} MB
              </div>
            }
          >
            <div className="min-h-50 max-h-300 overflow-y-auto section-scrollbar grid grid-cols-3 gap-5">
              {state.mediaAssets.map((asset) => (
                <AssetCard key={asset.name} asset={asset} />
              ))}
            </div>
          </FormWrapper>
        </div>
      </FormWrapper>

      {state.assetMode && (
        <div
          className="asset-handling-interface"
          onClick={() => actions.handleResetAssetStates("cancel")}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full h-80 bg-white rounded-[10px]"
          >
            {/* Ready to upload */}
            {actions.popUpToDisplay.dropZone && <DropZone />}

            {/* Compressing */}
            {actions.popUpToDisplay.compressing && <CompressingAsset />}

            {/* Editor */}
            {actions.popUpToDisplay.assetMediaEditor && <AssetMetaEditor />}

            {/* Error */}
            {actions.popUpToDisplay.assetHandlingError && (
              <AssetHandlingError />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
