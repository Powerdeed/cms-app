"use client";

import { useContext } from "react";
import { overviewContext } from "../context/DashboardContext";
import { activitiesContext } from "../context/ActivitiesContext";
import { inquiriesContext } from "../context/InquiriesContext";

export default function useActivitiesStates() {
  const overViewStates = useContext(overviewContext);
  const activitiesStates = useContext(activitiesContext);
  const inquiriesStates = useContext(inquiriesContext);

  if (!overViewStates || !activitiesStates || !inquiriesStates)
    throw new Error(
      "Overview, Activities and Inquiries context must be within a provider",
    );

  return { ...overViewStates, ...activitiesStates, ...inquiriesStates };
}
