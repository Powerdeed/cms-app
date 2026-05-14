"use client";

// modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// hooks
import useProjects from "../hooks/useProjects";
import { useGlobals } from "@globals";

// components
import Loader from "@global components/ui/Loader";
import ProjectCard from "./ProjectCard";

export default function AllProjects() {
  const { state, actions } = useProjects();
  const { globalActions } = useGlobals();

  return (
    <div className="flex-1 feature-container-vertical text-style__body">
      <div className="text-style__subheading">All Projects</div>

      {state.projects ? (
        Object.entries(state.projects).map(([category, projects]) => (
          <div
            key={category}
            className={`border border-(--terciary-grey) px-2 rounded-[10px]`}
          >
            <div
              className="flex items-center px-1 cursor-pointer h-10"
              onClick={() => {
                if (globalActions.hasUnsavedChanges) {
                  globalActions.showNotice();
                  return;
                }

                actions.handleSelectedCategory(category);
              }}
            >
              <div className="flex-1">{category}</div>

              <FontAwesomeIcon
                icon={["fas", "angle-down"]}
                className={`duration-300 ${category === state.selectedCategory ? "rotate-180" : "rotate-0"}`}
              />
            </div>

            <div
              className={`duration-300 transition-all ${category === state.selectedCategory ? "h-125 overflow-y-scroll section-scrollbar mb-2" : "h-0"}`}
            >
              {category === state.selectedCategory && (
                <div className="flex flex-col gap-1.5">
                  {projects.map((p) => (
                    <ProjectCard key={p._id} project={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <Loader loadingTxt="Loading projects" />
      )}
    </div>
  );
}
