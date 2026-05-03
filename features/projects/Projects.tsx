"use client";

import ProjectProvider from "./context/projectsProvider";
import ProjectsView from "./components/ProjectsView";

export default function Projects() {
  return (
    <ProjectProvider>
      <ProjectsView />
    </ProjectProvider>
  );
}
