"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import {
  Inquiry,
  InquiryTrendRange,
  InquiryTrends,
} from "../types/inquiries.types";

type InquiriesContext = {
  inquiries: Inquiry[];
  setInquiries: Dispatch<SetStateAction<Inquiry[]>>;

  inquiryTrends: InquiryTrends | null;
  setInquiryTrends: Dispatch<SetStateAction<InquiryTrends | null>>;

  selectedInquiryTrendRange: InquiryTrendRange;
  setSelectedInquiryTrendRange: Dispatch<SetStateAction<InquiryTrendRange>>;

  fetchingInquiries: boolean;
  setFetchingInquiries: Dispatch<SetStateAction<boolean>>;

  fetchingInquiriesError: string;
  setFetchingInquiriesError: Dispatch<SetStateAction<string>>;
};

export const inquiriesContext = createContext<InquiriesContext | null>(null);
