"use client";

import { useState } from "react";
import { overviewContext } from "./DashboardContext";
import { activitiesContext } from "./ActivitiesContext";
import { inquiriesContext } from "./InquiriesContext";
import { Activities } from "../types/activities.types";
import {
  Inquiry,
  InquiryTrendRange,
  InquiryTrends,
} from "../types/inquiries.types";

export default function OverviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visibleCount, setVisibleCount] = useState(5);

  // activities
  const [activities, setActivities] = useState<Activities[]>([]);
  const [fetchingActivities, setFetchingActivities] = useState(false);
  const [fetchingActivitiesError, setFetchingActivitiesError] = useState("");

  // inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiryTrends, setInquiryTrends] = useState<InquiryTrends | null>(
    null,
  );
  const [selectedInquiryTrendRange, setSelectedInquiryTrendRange] =
    useState<InquiryTrendRange>("current-year");
  const [fetchingInquiries, setFetchingInquiries] = useState(false);
  const [fetchingInquiriesError, setFetchingInquiriesError] = useState("");

  return (
    <overviewContext.Provider
      value={{
        visibleCount,
        setVisibleCount,
      }}
    >
      <activitiesContext.Provider
        value={{
          activities,
          setActivities,
          fetchingActivities,
          setFetchingActivities,
          fetchingActivitiesError,
          setFetchingActivitiesError,
        }}
      >
        <inquiriesContext.Provider
          value={{
            inquiries,
            setInquiries,
            inquiryTrends,
            setInquiryTrends,
            selectedInquiryTrendRange,
            setSelectedInquiryTrendRange,
            fetchingInquiries,
            setFetchingInquiries,
            fetchingInquiriesError,
            setFetchingInquiriesError,
          }}
        >
          {children}
        </inquiriesContext.Provider>
      </activitiesContext.Provider>
    </overviewContext.Provider>
  );
}
