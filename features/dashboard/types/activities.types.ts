import { InquiryDateInput } from "./inquiries.types";

export type Activities = {
  _id: string;
  name: string;
  email: string;
  role: string;
  action: string;
  collection: string;
  documentId: string;
  // allow nested objects/arrays/primitives for change snapshots
  // JSONValue covers strings, numbers, booleans, null, arrays and objects recursively
  changes: {
    before: JSONValue;
    after: JSONValue;
  } | null;
  createdAt: InquiryDateInput;
};

// Recursive JSON type to represent nested objects/arrays/primitives
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];
