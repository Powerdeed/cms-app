"use client";

import { testimonialsContext } from "@features/webisteContent";
import { homepageContext } from "../../context/homepage/homepageContext";

import { useContext } from "react";

export default function useHomepageState() {
  const homepageState = useContext(homepageContext);
  const testimonialsState = useContext(testimonialsContext);

  if (!homepageState || !testimonialsState)
    throw new Error("Context must be within a provider");

  return {
    ...homepageState,
    ...testimonialsState,
  };
}
