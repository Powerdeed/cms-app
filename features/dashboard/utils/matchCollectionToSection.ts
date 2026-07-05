import { SECTION_ACCENT_COLORS } from "../constants/sectionAccentColors";

export const matchCollectionToSection = (collection: string) => {
  let matchingSection: null | "general" | keyof typeof SECTION_ACCENT_COLORS;

  if (
    collection === "homepages" ||
    collection === "aboutus" ||
    collection === "contacts" ||
    collection === "companystructures" ||
    collection === "testimonials"
  ) {
    matchingSection = "Website Content";
  } else if (collection === "services") {
    matchingSection = "Services Management";
  } else if (collection === "assets") {
    matchingSection = "Media & Assets";
  } else if (collection === "inquiries") {
    matchingSection = "Form Inquiry";
  } else if (
    collection === "auditlogs" ||
    collection === "sessions" ||
    collection === "users"
  ) {
    matchingSection = "general";
  } else {
    matchingSection = null;
  }

  return matchingSection;
};
