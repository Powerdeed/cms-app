import { Activities } from "../types/activities.types";
import { Inquiry, InquiryDateInput } from "../types/inquiries.types";

export function getRecentActivities(
  auditActivities: Activities[],
  inquiries: Inquiry[],
) {
  return [
    ...getAuditActivities(auditActivities),
    ...getInquiryActivities(inquiries),
  ].sort((a, b) => getTimestamp(b.createdAt) - getTimestamp(a.createdAt));
}

function getAuditActivities(auditActivities: Activities[]): Activities[] {
  return auditActivities.map((activity) => ({
    ...activity,
    createdAt: getDate(activity.createdAt) ?? new Date(0),
  }));
}

function getInquiryActivities(inquiries: Inquiry[]): Activities[] {
  return inquiries.map((inquiry) => {
    const name = [inquiry.firstName, inquiry.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    return {
      _id: `inquiry-${inquiry._id}`,
      name,
      email: inquiry.email,
      role: "lead",
      action: `New inquiry${name ? ` from ${name}` : ""}`,
      collection: "inquiries",
      documentId: inquiry._id,
      changes: null,
      createdAt: getDate(inquiry.createdAt) ?? new Date(0),
    };
  });
}

function getDate(dateInput: InquiryDateInput | Date) {
  const rawDate =
    typeof dateInput === "object" && dateInput !== null && "$date" in dateInput
      ? dateInput.$date
      : dateInput;
  const date = new Date(rawDate);

  return Number.isNaN(date.getTime()) ? null : date;
}

function getTimestamp(dateInput: InquiryDateInput) {
  return getDate(dateInput)?.getTime() ?? 0;
}
