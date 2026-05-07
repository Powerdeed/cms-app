"use client";

// components
import Button, { ButtonLight } from "@global components/ui/Button";
import SearchBar from "@global components/ui/SearchBar";
import FormWrapper from "@global components/layout/FormWrapper";
import { useEffect } from "react";
import {
  // components
  CompressingAsset,
  DropZone,
  FileMetaEditor,
  FileHandlingError,

  // utils
  supportedFileTypes,

  // hooks
  useFileUploader,
} from "@global components/layout/fileUploader";

// feature components
import AssetCard from "../components/AssetCard";

// utils
import { getTotalUsedSpace, toCamelCase } from "../utils/conversions";

// hooks
import useMediaAssets from "../hooks/useAssets";

// constants
import { PAGE_META } from "../constants/pageMeta";
import { usagePaths } from "../constants/assetUsagePaths";

export function MediaAssetsView() {
  const { state, actions } = useMediaAssets();
  const { uploaderState, uploaderActions } = useFileUploader();
  const { setAssetUsagePaths } = uploaderState;

  useEffect(() => {
    const loadAssetUsagePaths = async () => {
      setAssetUsagePaths(await usagePaths);
    };

    loadAssetUsagePaths();
  }, [setAssetUsagePaths]);

  return (
    <div className="relative page-layout">
      <FormWrapper
        title={PAGE_META.title}
        subtitle={PAGE_META.subtitle}
        subtitleChildren={
          <Button
            buttonText="Upload Files"
            clickAction={() => uploaderActions.handleTargetAsset("new")}
          />
        }
      >
        <div className="feature-container-horizontal">
          <SearchBar
            val={state.searchQuery}
            placeholder="Search assets..."
            changeFunc={(val) => state.setSearchQuery(val)}
          />

          {["All", ...supportedFileTypes].map((category) => (
            <ButtonLight
              key={category}
              buttonText={category}
              clickAction={() =>
                uploaderState.setTargetFileType(
                  category as typeof uploaderState.targetFileType,
                )
              }
            />
          ))}
        </div>

        <div className="feature-container-vertical">
          <FormWrapper
            subtitle={`${uploaderState.targetFileType === "All" ? "All Assets" : `${toCamelCase(uploaderState.targetFileType)}s`} (${state.mediaAssets.length})`}
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

      {uploaderState.assetMode && (
        <div
          className="asset-handling-interface"
          onClick={() => uploaderActions.handleResetAssetStates("cancel")}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-[10px]"
          >
            {/* Ready to upload */}
            {uploaderActions.popUpToDisplay.dropZone && <DropZone />}

            {/* Compressing */}
            {uploaderActions.popUpToDisplay.compressing && <CompressingAsset />}

            {/* Editor */}
            {uploaderActions.popUpToDisplay.assetMediaEditor && (
              <FileMetaEditor
                onAssetUploaded={actions.handleSubmitMediaAsset}
                onAssetUpdated={actions.handleUpdateTargetAsset}
              />
            )}

            {/* Error */}
            {uploaderActions.popUpToDisplay.assetHandlingError && (
              <FileHandlingError />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
