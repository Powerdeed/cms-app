"use client";

import { useState } from "react";
import Button, { ButtonRed, DeleteIconBtn } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { InputArea } from "@global components/layout/FormWrapper";
import Toggle from "@global components/ui/Toggle";
import {
  AssetLookUp,
  FileUploader,
  RenderAsset,
  useFileUploader,
} from "@global components/layout/fileUploader";

import useService from "../hooks/useService";

import { toPascalCase, truncateTxt } from "@globals";

export default function ServiceEditor() {
  const { state, actions } = useService();
  const { uploaderState, uploaderActions } = useFileUploader();
  const [assetAddMode, setAssetAddMode] = useState<"existing" | "new" | null>(
    null,
  );

  const openAssetAddMode = (mode: "existing" | "new") => {
    if (assetAddMode === mode) {
      setAssetAddMode(null);
      uploaderActions.resetAssetLinkingState();
      return;
    }

    setAssetAddMode(mode);

    if (mode === "new") {
      uploaderActions.handleTargetAsset("new");
      return;
    }

    uploaderActions.resetAssetLinkingState();
  };

  return (
    <div
      className={`flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 ${state.hasServiceChanged ? "border-(--secondary-blue)" : "border-(--terciary-grey)"} border bg-white rounded-[10px] text-style__body`}
    >
      <div className="text-(--secondary-blue) text-style__small-text">
        {state.hasServiceChanged &&
          "changes have been made, save before exiting"}
      </div>

      <div className="text-style__subheading">
        {state.isNewService ? "Add New Service" : "Edit Service"}
      </div>

      {!state.selectedService && <div>Select a service to start editing</div>}

      {state.selectedService && (
        <div className="vertical-layout__outer">
          <InputArea
            label={toPascalCase("name")}
            changeFunc={(val) => actions.modifyService("name", val)}
            val={state.selectedService.name}
          />

          <InputArea
            label={toPascalCase("description")}
            changeFunc={(val) => actions.modifyService("description", val)}
            val={state.selectedService.description}
          />

          <div className="vertical-layout__outer">
            <div className="flex-1 text-style__body">Gallery</div>
            {state.selectedService.gallery.length > 0 ? (
              <div className="grid max-h-90 grid-cols-2 gap-2.5 overflow-y-auto pr-1">
                {state.selectedService.gallery.map((image) => (
                  <div
                    key={image[0]}
                    className="group relative h-40 cursor-pointer overflow-hidden rounded-[10px] border border-(--secondary-grey)/30 bg-(--secondary-grey)/10"
                    onClick={() => uploaderState.setSelectedAssetId(image[0])}
                  >
                    <RenderAsset asset={image} />

                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 bg-black/60 p-2 text-white transition-transform duration-300 group-hover:translate-y-0">
                      <div className="min-w-0 flex-1 text-style__small-text">
                        {truncateTxt(image[1], 100)}
                      </div>

                      <div onClick={(event) => event.stopPropagation()}>
                        <DeleteIconBtn
                          deleteFunc={() => {
                            actions.handleRemoveImageFromService(image[0]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-style__small-text text-(--secondary-grey)">
                No gallery media selected
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                buttonText="Use existing media"
                clickAction={() => openAssetAddMode("existing")}
              />

              <Button
                buttonText="Upload new media"
                clickAction={() => openAssetAddMode("new")}
              />
            </div>

            {assetAddMode === "existing" && (
              <AssetLookUp
                label="Paste the media id"
                onFindSuccess={() => {
                  actions.linkExistingServiceImage();
                  setAssetAddMode(null);
                }}
              />
            )}

            {assetAddMode === "new" && (
              <FileUploader
                onAssetUploaded={(asset) => {
                  actions.linkUploadedServiceImage(asset);
                  setAssetAddMode(null);
                }}
              />
            )}
          </div>

          <div className="flex">
            <div className="flex-1 text-style__body">Set as active</div>

            <Toggle
              state={state.selectedServiceStatus}
              stateSetter={state.setSelectedServiceStatus}
            />
          </div>

          <div className="flex justify-between">
            <Button
              buttonText={state.isNewService ? "Add Service" : "Save Changes"}
              clickAction={() => {
                if (state.isNewService) {
                  actions.handleUploadNewService();
                } else {
                  actions.handleUploadServiceChanges();
                }
              }}
              disabled={state.isUploading}
            >
              {state.isUploading && <Loader />}
            </Button>

            <ButtonRed
              buttonText={
                state.isNewService ? "Ignore Service" : "Delete Service"
              }
              clickAction={() => {
                if (state.isNewService) {
                  actions.handleIgnoreNewService();
                } else {
                  actions.handleDeleteService();
                }
              }}
              disabled={state.isDeleting}
            >
              {state.isDeleting && <Loader />}
            </ButtonRed>
          </div>

          {state.error && (
            <div className="text-(--primary-red)">*{state.error}*</div>
          )}
        </div>
      )}
    </div>
  );
}
