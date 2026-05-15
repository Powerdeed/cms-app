import { NullableLinkedAsset } from "./linkedAsset.types";

export type NewTestimonial = {
  name: string;
  position: string;
  industry: string;
  testimonial: string;
  profilePic: NullableLinkedAsset;
};

export type Testimonial = {
  _id: string;
  name: string;
  position: string;
  industry: string;
  testimonial: string;
  profilePic: NullableLinkedAsset;
};

export type Hero = {
  title: string;
  subtitle: string;
  image: NullableLinkedAsset;
};

export type AboutIntro = {
  title: string;
  description: string;
  image: NullableLinkedAsset;
  flipped: boolean;
};

export type Homepage = {
  hero: Hero;
  aboutIntro: AboutIntro[];
};
