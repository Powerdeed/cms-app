"use client";

import { useState } from "react";

import { testimonialsContext } from "./testimonialsContext";

import { Testimonial } from "../../types/homePage.types";

export default function TestimonialsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [testimonialsPrev, setTestimonialsPrev] = useState<
    Testimonial[] | null
  >(null);

  const [getTestimonialsError, setGetTestimonialsError] = useState("");

  const [addTestimonialsError, setAddTestimonialsError] = useState("");

  const [addingTestimonials, setAddingTestimonials] = useState(false);

  const [updatingTestimonials, setUpdatingTestimonials] = useState(false);

  const [deletingTestimonials, setDeletingTestimonials] = useState(false);

  const [testimonialsError, setTestimonialsError] = useState("");

  const [refreshFetchTestimonials, setRefreshFetchTestimonials] =
    useState(false);

  const [editedTestimonials, setEditedTestimonials] = useState<string[]>([]);

  const [hasTestimonialsChanged, setHasTestimonialsChanged] = useState(false);

  const [fetchingTestimonialsData, setFetchingTestimonialsData] =
    useState(false);

  return (
    <testimonialsContext.Provider
      value={{
        testimonials,
        setTestimonials,
        testimonialsPrev,
        setTestimonialsPrev,
        getTestimonialsError,
        addTestimonialsError,
        setAddTestimonialsError,
        setGetTestimonialsError,
        addingTestimonials,
        setAddingTestimonials,
        updatingTestimonials,
        setUpdatingTestimonials,
        deletingTestimonials,
        setDeletingTestimonials,
        testimonialsError,
        setTestimonialsError,
        refreshFetchTestimonials,
        setRefreshFetchTestimonials,
        editedTestimonials,
        setEditedTestimonials,
        hasTestimonialsChanged,
        setHasTestimonialsChanged,
        fetchingTestimonialsData,
        setFetchingTestimonialsData,
      }}
    >
      {children}
    </testimonialsContext.Provider>
  );
}
