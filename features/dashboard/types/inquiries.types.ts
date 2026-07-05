export type InquiryDateInput = string | Date | { $date: string | Date };

export type Inquiry = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  servicesInterested: string[];
  propertyTypes: string[];
  additionalInfo: string;
  hearAboutUs: string;
  source: string;
  status: "new" | "existing";
  marketing: {
    status: "active" | "inactive";
    currectSequence: number;
    maxSequence: number;
    qstashMessageId: string;
    nextEmailAt: string | Date | null;
    lastEmailSentAt: string | Date | null;
    lastProviderEmailId: string;
    lastError: string;
  };
  notifications: {
    status: string;
    qstashMessageId: string;
    providerEmailId: string;
    sentAt: string | Date;
    lastError: string;
  };
  createdAt: InquiryDateInput;
  updatedAt: InquiryDateInput;
};

export type Month =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export type InquiryTrends = {
  [year: number]: Record<Month, number>;
};

export type InquiryTrendRange = "last-month" | "last-6-months" | "current-year" | `${number}`;

export type LeadSourceData = {
  labels: string[];
  values: number[];
};
