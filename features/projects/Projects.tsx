"use client";

import ProjectProvider from "./context/projectsProvider";
import ProjectsView from "./components/ProjectsView";
import { FileUploaderProvider } from "@global components/layout/file-uploader";

export default function Projects() {
  return (
    <FileUploaderProvider>
      <ProjectProvider>
        <ProjectsView />
      </ProjectProvider>
    </FileUploaderProvider>
  );
}
