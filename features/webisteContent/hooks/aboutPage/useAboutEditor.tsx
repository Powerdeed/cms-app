"use client";

import { useContext } from "react";

import { isEqual } from "lodash";

import { aboutpageContext } from "../../context/aboutpage/aboutpageContext";

import { AboutUs } from "../../types/aboutPage.types";

import {
  isStringArray,
  isStringMatrix,
} from "../../../../globals/helper functions/typeCheckers";

export default function useAboutEditor() {
  const aboutpageState = useContext(aboutpageContext);

  if (!aboutpageState) throw new Error("Context must be within a provider");

  const { aboutUs, aboutUsPrev, setAboutUs, setHasAboutpageChanged } =
    aboutpageState;

  const updateByPath = (path: (string | number)[], value: unknown) => {
    setAboutUs((prev) => {
      if (!prev) return prev;

      const clone = structuredClone(prev);

      let current: unknown = clone as AboutUs[];

      for (let i = 0; i < path.length - 1; i++) {
        if (
          typeof current === "object" &&
          current !== null &&
          (Array.isArray(current)
            ? typeof path[i] === "number"
            : path[i] in current)
        ) {
          current = (current as Record<string | number, unknown>)[path[i]];
        } else {
          console.warn("Invalid path:", path);
          return prev;
        }
      }

      const lastKey = path[path.length - 1];

      if (typeof current === "object" && current !== null) {
        (current as Record<string | number, unknown>)[lastKey] = value;
      }

      setHasAboutpageChanged(!isEqual(aboutUsPrev, clone));

      return clone;
    });
  };

  const updateDescription = (
    value: AboutUs["description"],
    // paths
    sectionIndex: number,
    arrayIndices?: number[],
  ) => {
    if (arrayIndices)
      return updateByPath(
        [sectionIndex, "description", ...arrayIndices],
        value,
      );

    return updateByPath([sectionIndex, "description"], value);
  };

  const handleDescriptionArray = (
    reason: "add" | "delete",
    index: number,
    itemIndex?: number,
  ) => {
    if (!aboutUs) return;

    const section = aboutUs[index];

    if (isStringArray(section.description)) {
      updateByPath(
        [index, "description"],
        reason === "add"
          ? [...section.description, ""]
          : itemIndex !== undefined
            ? section.description.toSpliced(itemIndex, 1)
            : section.description,
      );
    } else if (isStringMatrix(section.description)) {
      updateByPath(
        [index, "description"],
        reason === "add"
          ? [...section.description, ["", ""]]
          : itemIndex !== undefined
            ? section.description.toSpliced(itemIndex, 1)
            : section.description,
      );
    }
  };

  return {
    aboutUs,
    updateDescription,
    handleDescriptionArray,
  };
}
