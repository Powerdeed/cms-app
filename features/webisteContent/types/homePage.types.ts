import { LinkedAsset } from "./linkedAsset.types";

export type NewTestimonial = {
  name: string;
  position: string;
  industry: string;
  testimonial: string;
  profilePic: LinkedAsset;
};

export type Testimonial = {
  _id: string;
  name: string;
  position: string;
  industry: string;
  testimonial: string;
  profilePic: LinkedAsset;
};

export type Hero = {
  title: string;
  subtitle: string;
  image: LinkedAsset;
};

export type AboutIntro = {
  title: string;
  description: string;
  image: LinkedAsset;
  flipped: boolean;
};

export type Homepage = {
  hero: Hero;
  aboutIntro: AboutIntro[];
};
