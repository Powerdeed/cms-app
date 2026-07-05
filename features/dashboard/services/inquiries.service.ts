import { apiRequest } from "@lib";
import { Inquiry } from "../types/inquiries.types";

export const getInquiries = async (): Promise<Inquiry[]> =>
  await apiRequest<Inquiry[]>({
    method: "GET",
    url: "/inquiries",
  });

export const deleteInquiry = async (inquiryId: string): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/inquiries/${inquiryId}`,
  });

export const deleteInquiries = async (inquiryIds: string): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/inquiries/${inquiryIds}`,
  });
