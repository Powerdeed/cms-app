"use client";

import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import HeroAndAboutEditor from "./HeroAndAboutEditor";
import TestimonialsEditor from "./TestimonialsEditor";

import useHomePage from "../../hooks/homepage/useHomepage";

export default function HomePage() {
  const { state, actions } = useHomePage();
  const isSavingContent =
    state.updatingHomepage || state.updatingTestimonials;

  return (
    <div className="text-style__body vertical-layout__outer">
      {state.homepage ? (
        <HeroAndAboutEditor />
      ) : (
        <Loader loadingTxt="Loading Home page data" />
      )}

      {state.testimonials ? (
        <TestimonialsEditor />
      ) : (
        <Loader loadingTxt="Loading Home page data" />
      )}

      {actions.getErrors && (
        <div className="text-(--primary-red)">{actions.getErrors}</div>
      )}

      <div className="flex gap-2.5 items-center justify-end">
        <Button
          buttonType="light"
          buttonText="Reset Changes"
          clickAction={() => {
            state.setRefreshFetchHomepage((prev) => !prev);
            state.setRefreshFetchTestimonials((prev) => !prev);
          }}
          icon={actions.fetchingData && <Loader />}
          disabled={actions.fetchingData || isSavingContent}
        />

        <Button
          buttonText="Save All Changes"
          clickAction={() => {
            actions.handleSaveHomepage();
            actions.handleSaveTestimonials();
          }}
          disabled={isSavingContent || actions.fetchingData}
        >
          {isSavingContent && <Loader />}
        </Button>
      </div>

      {actions.updateErrors && (
        <div className="text-(--primary-red)">{actions.updateErrors}</div>
      )}
    </div>
  );
}
