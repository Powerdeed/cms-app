"use client";

// components
import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import SearchBar from "@global components/ui/SearchBar";
import FormWrapper from "@global components/layout/FormWrapper";
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
import DeleteAssetOptions from "@global components/layout/fileUploader/components/DeleteAssetOptions";

export function MediaAssetsView() {
  const { state, actions } = useMediaAssets();
  const { uploaderState, uploaderActions } = useFileUploader();
  const isDeletingTargetAsset =
    !!uploaderState.targetAsset &&
    state.deletingAssetIds.includes(uploaderState.targetAsset.id);

  const openUnassignedUpload = () => {
    uploaderActions.pathSetter("assets/unassigned");
    uploaderActions.updatePathSetters(undefined, "assets/unassigned");
    uploaderActions.handleTargetAsset("new");
  };

  return (
    <div className="relative page-layout">
      <FormWrapper
        title={PAGE_META.title}
        subtitle={PAGE_META.subtitle}
        subtitleChildren={
          <Button
            buttonText="Upload Files"
            clickAction={openUnassignedUpload}
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
                Total Storage: {getTotalUsedSpace(state.allMediaAssets)} MB
              </div>
            }
          >
            <div className="min-h-50 max-h-300 overflow-y-auto section-scrollbar grid grid-cols-3 gap-5">
              {state.fetchingMediaAssets ? (
                <div className="col-span-3 flex min-h-50 items-center justify-center text-style__small-text text-(--secondary-grey)">
                  <Loader loadingTxt="Loading assets" />
                </div>
              ) : state.mediaAssets.length > 0 ? (
                state.mediaAssets.map((asset) => (
                  <AssetCard
                    key={asset.id || asset.storage?.objectName}
                    asset={asset}
                  />
                ))
              ) : (
                <div className="col-span-3 text-style__small-text text-(--secondary-grey)">
                  No assets found
                </div>
              )}
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

      {state.showDeleteOptions && (
        <div
          className="asset-handling-interface"
          onClick={() => state.setShowDeleteOptions(false)}
        >
          <DeleteAssetOptions
            forceDelete={() =>
              uploaderState.targetAsset &&
              actions.handleDeleteAsset(uploaderState.targetAsset, "force")
            }
            unlinkAndDelete={() =>
              uploaderState.targetAsset &&
              actions.handleDeleteAsset(uploaderState.targetAsset, "unlink")
            }
            isDeleting={isDeletingTargetAsset}
          />
        </div>
      )}
    </div>
  );
}
