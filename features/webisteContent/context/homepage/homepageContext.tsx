"use client";

import { Homepage } from "@features/webisteContent";

import { createContext, Dispatch } from "react";

type HomepageState = {
  homepage: Homepage | null;
  setHomepage: Dispatch<React.SetStateAction<Homepage | null>>;

  homepagePrev: Homepage | null;
  setHomepagePrev: Dispatch<React.SetStateAction<Homepage | null>>;

  fetchingHomepageData: boolean;
  setFetchingHomepageData: Dispatch<React.SetStateAction<boolean>>;

  getHomepageDataError: string;
  setGetHomepageDataError: Dispatch<React.SetStateAction<string>>;

  updatingHomepage: boolean;
  setUpdatingHomepage: Dispatch<React.SetStateAction<boolean>>;

  updateHomepageDataError: string;
  setUpdateHomepageDataError: Dispatch<React.SetStateAction<string>>;

  hasHomePageChanged: boolean;
  setHasHomePageChanged: Dispatch<React.SetStateAction<boolean>>;

  refreshFetchHomepage: boolean;
  setRefreshFetchHomepage: Dispatch<React.SetStateAction<boolean>>;
};

export const homepageContext = createContext<HomepageState | null>(null);
