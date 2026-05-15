"use client";

import { useContext } from "react";

import { isEqual } from "lodash";

import { testimonialsContext } from "../../context/homepage/testimonialsContext";
import { NullableLinkedAsset } from "../../types/linkedAsset.types";

export default function useTestimonials() {
  const testimonialsState = useContext(testimonialsContext);

  if (!testimonialsState)
    throw new Error("testimonials context must be within a provider");

  const {
    testimonialsPrev,
    setTestimonials,
    setEditedTestimonials,
    setHasTestimonialsChanged,
  } = testimonialsState;

  const updateTestimonial = (
    key: string,
    data: string | NullableLinkedAsset,
    testimonialId: string,
  ) => {
    setEditedTestimonials((prev) =>
      prev.includes(testimonialId) ? prev : [...prev, testimonialId],
    );

    setTestimonials((prev) => {
      if (!prev) return prev;

      const updatedTestimonials = prev.map((testimonial) => {
        if (testimonial._id === testimonialId) {
          return {
            ...testimonial,
            [key]: data,
          };
        }
        return testimonial;
      });

      setHasTestimonialsChanged(
        !isEqual(updatedTestimonials, testimonialsPrev),
      );

      return updatedTestimonials;
    });
  };

  return {
    updateTestimonial,
  };
}
