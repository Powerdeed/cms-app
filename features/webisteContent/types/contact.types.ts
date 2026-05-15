import { NullableLinkedAsset } from "./linkedAsset.types";

export type Contacts = {
  Hero: {
    image: NullableLinkedAsset;
    title: string;
    subtitle: string;
  };
  Location: {
    Address: string;
    City: string;
    Town: string;
    Country: string;
  };
  ContactInformation: {
    Phone: string[];
    Email: string[];
  };
  "working-hours": {
    [key: string]: {
      from: string;
      to: string;
    } | null;
  };
  Socials: {
    url: string;
    name: string;
  }[];
};
