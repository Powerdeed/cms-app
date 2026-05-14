"use client";

import { useContext } from "react";

import { isEqual } from "lodash";

import { homepageContext } from "../../context/homepage/homepageContext";

import { Homepage } from "../../types/homePage.types";
import { testimonialsContext } from "../../context/homepage/testimonialsContext";
import { LinkedAsset } from "../../types/linkedAsset.types";

export default function useHomePageEditor() {
  const homepageState = useContext(homepageContext);

  const testimonialsState = useContext(testimonialsContext);

  if (!homepageState || !testimonialsState)
    throw new Error(
      "Home page and testimonials context must be within a provider",
    );

  const {
    homepage,
    setHomepage,
    homepagePrev,
    setUpdateHomepageDataError,
    setHasHomePageChanged,
  } = homepageState;

  const { setTestimonialsError } = testimonialsState;

  const updateHomePageData = (
    key: string,
    innerKey: keyof Homepage,
    data: string | boolean | LinkedAsset | null,
    section?: number,
  ) => {
    if (!homepage || !homepagePrev) return;

    setUpdateHomepageDataError("");
    setTestimonialsError("");

    setHomepage((prev) => {
      if (!prev) return prev;

      let updated;

      if (innerKey === "hero") {
        updated = {
          ...prev,
          hero: { ...prev.hero, [key]: data },
        };
      } else if (innerKey === "aboutIntro") {
        const updatedIntro = prev.aboutIntro.map((item, index) =>
          index === section ? { ...item, [key]: data } : item,
        );

        updated = {
          ...prev,
          aboutIntro: updatedIntro,
        };
      } else {
        return prev;
      }

      setHasHomePageChanged(!isEqual(updated, homepagePrev));

      return updated;
    });
  };

  return {
    updateHomePageData,
  };
}
