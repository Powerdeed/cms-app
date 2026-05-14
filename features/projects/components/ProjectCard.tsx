"use client";

import { truncateTxt, useGlobals } from "@globals";
import useProjects from "../hooks/useProjects";
import { Project } from "../types/projects.types";

export default function ProjectCard({ project }: { project: Project }) {
  const { actions } = useProjects();
  const { globalActions } = useGlobals();

  return (
    <div
      key={project._id}
      className={`feature-container-vertical text-style__small-text cursor-pointer`}
      onClick={() => {
        if (globalActions.hasUnsavedChanges) {
          globalActions.showNotice();
          return;
        }

        actions.handleSelectedProject(project);
      }}
    >
      <div className="flex gap-2.5 items-center">
        <div className="flex-1 text-style__big-text">{project.name}</div>

        <div className="grid gap-2 text-center">
          <div
            className={`${project.status === "Completed" ? "bg-(--secondary-green)/40 text-(--primary-green)" : "bg-(--secondary-blue)/40 text-(--primary-blue)"} rounded-[10px] p-1`}
          >
            {project.status}
          </div>

          {project.featured && (
            <div
              className={`border border-(--secondary-blue) text-(--secondary-blue) rounded-[10px] p-1`}
            >
              Featured
            </div>
          )}
        </div>
      </div>

      <div>{truncateTxt(project.description, 100)}</div>
    </div>
  );
}
