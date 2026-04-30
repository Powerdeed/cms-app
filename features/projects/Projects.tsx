"use client";

import ProjectProvider from "./context/projectsProvider";
import ProjectsView from "./components/ProjectsView";
import MediaAssetsProvider from "@features/mediaAndAssets/context/MediaAssetsProvider";

export default function Projects() {
  return (
    <MediaAssetsProvider>
      <ProjectProvider>
        <ProjectsView />
      </ProjectProvider>
    </MediaAssetsProvider>
  );
}
