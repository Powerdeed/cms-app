"use client";

import { useEffect } from "react";
import ServiceEditor from "./ServiceEditor";
import ServicesDisplay from "./ServicesDisplay";
import Button from "@global components/ui/Button";
import { SectionTitle } from "@global components/ui/Title";
import {
  FileMetaEditor,
  useAssetFeatureLinks,
  useFileUploader,
} from "@global components/layout/fileUploader";

import { PAGE_META } from "../constants/pageMeta";

import useService from "../hooks/useService";
import { useGlobals } from "@globals";

export function ServicesManagementView() {
  const { state, actions } = useService();
  const { globalActions } = useGlobals();
  const { uploaderState, uploaderActions } = useFileUploader();
  const { resetAssetLinkingState } = useAssetFeatureLinks();

  useEffect(() => {
    resetAssetLinkingState();
  }, [resetAssetLinkingState]);

  return (
    <div className="relative uniform-page-display">
      <div className="flex items-center">
        <div className="flex-1">
          <SectionTitle title={PAGE_META.title} subtitle={PAGE_META.subtitle} />
        </div>

        <Button
          buttonText={"+ Add New Service"}
          clickAction={() => {
            if (globalActions.hasUnsavedChanges) {
              globalActions.showNotice({
                title: "Save changes to service data",
              });
              return;
            }

            actions.handleAddNewService();
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:gap-5">
        <ServicesDisplay />

        <ServiceEditor />
      </div>

      {uploaderState.selectedAssetId && (
        <div
          className="overlay"
          onClick={() => {
            uploaderState.setSelectedAssetId("");
            uploaderActions.handleResetAssetStates("cancel");
          }}
        >
          <FileMetaEditor onAssetUpdated={actions.updateServiceImageRef} />
        </div>
      )}

      {state.fetchServicesError && (
        <div className="text-(--primary-red) text-style__small-text">
          Error fetching services: {state.fetchServicesError}
        </div>
      )}
    </div>
  );
}
