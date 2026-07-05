"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { Activities } from "../types/activities.types";

type ActivitiesContext = {
  activities: Activities[];
  setActivities: Dispatch<SetStateAction<Activities[]>>;

  fetchingActivities: boolean;
  setFetchingActivities: Dispatch<SetStateAction<boolean>>;

  fetchingActivitiesError: string;
  setFetchingActivitiesError: Dispatch<SetStateAction<string>>;
};

export const activitiesContext = createContext<ActivitiesContext | null>(null);
