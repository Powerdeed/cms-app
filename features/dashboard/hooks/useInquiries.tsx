"use client";

import { useContext, useEffect } from "react";
import { execute } from "@lib";
import { inquiriesContext } from "../context/InquiriesContext";
import { Inquiry } from "../types/inquiries.types";
import { getInquiries } from "../services/inquiries.service";
import { getInquiryTrendsFromInquiries } from "../utils/getInquiryTrendsFromInquiries";

export default function useInquiries() {
  const inquiryStates = useContext(inquiriesContext);

  if (!inquiryStates)
    throw new Error("Inquiry Context must be within a Provider");

  const {
    setInquiries,
    setInquiryTrends,
    setFetchingInquiries,
    setFetchingInquiriesError,
  } = inquiryStates;

  useEffect(() => {
    const fetchInquiries = async () => {
      await execute(getInquiries, {
        setLoading: setFetchingInquiries,
        setError: setFetchingInquiriesError,
        onSuccess: (inquiriesData: Inquiry[]) => {
          setInquiryTrends(getInquiryTrendsFromInquiries(inquiriesData));
          setInquiries(inquiriesData);
        },
      });
    };

    fetchInquiries();
  }, [
    setFetchingInquiries,
    setFetchingInquiriesError,
    setInquiries,
    setInquiryTrends,
  ]);

  return {};
}
