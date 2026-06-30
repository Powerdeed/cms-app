"use client";

import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import FormWrapper from "@global components/layout/FormWrapper";

import OverviewSubsectionEditor from "./OverviewSubsectionEditor";

import CompanyStructureEditor from "./CompanyStructureEditor";

import useAboutPage from "../../hooks/aboutPage/useAboutPage";

export default function AboutPage() {
  const { state, actions } = useAboutPage();

  return (
    <div className="vertical-layout__outer">
      <FormWrapper
        title="Overview Subsection"
        subtitle=""
        separatorLine={false}
      >
        <div
          className={`vertical-layout__outer border-(--secondary-blue) rounded-[10px] p-2.5 ${state.hasHompageChanged && "border-2"}`}
        >
          {state.hasHompageChanged && (
            <div className="text-(--secondary-blue) text-style__small-text mb-2.5">
              Changes have been made, save before exiting
            </div>
          )}
          {state.aboutUs ? (
            <OverviewSubsectionEditor />
          ) : (
            <Loader loadingTxt="Loading About page data" />
          )}
        </div>
      </FormWrapper>

      <FormWrapper
        title="Company Structure"
        subtitle=""
        subtitleChildren={
          <Button
            buttonType="light"
            buttonText="+ Add Level"
            clickAction={actions.addHierarchyLevel}
          />
        }
      >
        <div
          className={`border-(--secondary-blue) rounded-[10px] p-2.5 ${state.hasCompanyStructureChanged && "border-2"}`}
        >
          {state.hasCompanyStructureChanged && (
            <div className="text-(--secondary-blue) text-style__small-text mb-2.5">
              Changes have been made, save before exiting
            </div>
          )}
          <div className="h-200 feature-container-vertical overflow-auto section-scrollbar">
            {state.companyStructure ? (
              <CompanyStructureEditor />
            ) : (
              <Loader loadingTxt="Loading Company Structure" />
            )}
          </div>
        </div>
      </FormWrapper>

      <div className="text-(--primary-red)">
        {state.updatingAboutUsError}
        {state.updatingCompanyStructureError}
      </div>

      <div className="flex gap-2.5 items-center justify-end">
        <Button
          buttonType="light"
          buttonText="Reset Changes"
          clickAction={() => {
            state.setRefreshAboutpage((prev) => !prev);
            state.setRefreshCompanyStructure((prev) => !prev);
          }}
          icon={
            (state.loadingAboutUs || state.loadingCompanyStructure) && (
              <Loader />
            )
          }
          disabled={
            state.loadingAboutUs ||
            state.loadingCompanyStructure ||
            state.updatingAboutUs ||
            state.updatingCompanyStructure
          }
        />
        <Button
          buttonText="Save All Changes"
          clickAction={() => {
            actions.handleSaveAboutPage();
            actions.handlesaveCompanyStructure();
          }}
          disabled={state.updatingAboutUs || state.updatingCompanyStructure}
        >
          {(state.updatingAboutUs || state.updatingCompanyStructure) && (
            <Loader />
          )}
        </Button>
      </div>
    </div>
  );
}
