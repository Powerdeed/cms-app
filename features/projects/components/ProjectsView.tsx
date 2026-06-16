"use client";

import Button from "@global components/ui/Button";
import { SectionTitle } from "@global components/ui/Title";
import NoProjectSelected from "./NoProjectSelected";
import EditProject from "./EditProject";
import AllProjects from "./AllProjects";

import useProjects from "../hooks/useProjects";

import { PAGE_META } from "../constants/pageMeta";
import {
  FileMetaEditor,
  useFileUploader,
} from "@global components/layout/fileUploader";
import { useGlobals } from "@globals";

export default function ProjectsView() {
  const { state, actions } = useProjects();
  const { globalActions } = useGlobals();
  const { uploaderState, uploaderActions } = useFileUploader();

  return (
    <div className="uniform-page-display">
      <div className="flex items-center">
        <div className="flex-1">
          <SectionTitle title={PAGE_META.title} subtitle={PAGE_META.subtitle} />
        </div>
        <Button
          buttonText={"+ Add New Project"}
          clickAction={() => {
            if (globalActions.hasUnsavedChanges) {
              globalActions.showNotice();
              return;
            }
            actions.resetStates("new");
          }}
        />
      </div>

      <div className="flex gap-5">
        <AllProjects />

        {state.selectedProject && <EditProject />}

        {!state.selectedProject && <NoProjectSelected />}
      </div>

      {uploaderState.selectedAssetId && (
        <div
          className="asset-handling-interface"
          onClick={() => {
            uploaderState.setSelectedAssetId("");
            uploaderActions.handleResetAssetStates("cancel");
          }}
        >
          <FileMetaEditor onAssetUpdated={actions.updateProjectsImageRef} />
        </div>
      )}
    </div>
  );
}
