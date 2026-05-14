"use client";

import { useContext } from "react";

import { isEqual } from "lodash";

import { contactpageContext } from "../../context/contactpage/contactpageContext";

import { Contacts } from "../../types/contact.types";
import { LinkedAsset } from "../../types/linkedAsset.types";

export default function useContactPageEditor() {
  const contactpageState = useContext(contactpageContext);

  if (!contactpageState)
    throw new Error("Contact page context must be within a provider");

  const { contactsPrev, setContacts, setHasContactsChanged } = contactpageState;

  const updateByPath = (
    path: (string | number)[],
    value: string | null | LinkedAsset | Record<string, string>,
  ) =>
    setContacts((prev) => {
      if (!prev) return prev;

      const clone: Contacts = structuredClone(prev);

      let current: unknown = clone;

      for (let i = 0; i < path.length - 1; i++) {
        current = (
          current as Record<
            string | number,
            string | null | LinkedAsset | Record<string, string>
          >
        )[path[i] as string];
      }

      (
        current as Record<
          string | number,
          string | null | LinkedAsset | Record<string, string>
        >
      )[path[path.length - 1] as string] = value;

      setHasContactsChanged(!isEqual(contactsPrev, clone));

      return clone;
    });

  const handleAddContactInfo = (
    phoneOrEmail: keyof Contacts["ContactInformation"],
  ) => {
    setHasContactsChanged(true);

    setContacts((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        ContactInformation: {
          ...prev.ContactInformation,
          [phoneOrEmail]: [...prev.ContactInformation[phoneOrEmail], ""],
        },
      };
    });
  };

  const handleDeleteContactInfo = (
    phoneOrEmail: keyof Contacts["ContactInformation"],
    idx: number,
  ) => {
    setHasContactsChanged(true);

    setContacts((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        ContactInformation: {
          ...prev.ContactInformation,
          [phoneOrEmail]: prev.ContactInformation[phoneOrEmail].filter(
            (_, index) => index !== idx,
          ),
        },
      };
    });
  };

  const handleAddSocials = () => {
    setHasContactsChanged(true);

    setContacts((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        Socials: [
          ...prev.Socials,
          { name: "Social Platform", url: "Social Link" },
        ],
      };
    });
  };

  const handleDeleteSocials = (idx: number) => {
    setHasContactsChanged(true);

    setContacts((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        Socials: prev.Socials.filter((_, i) => i !== idx),
      };
    });
  };

  const handleImageUpload = () => {};

  return {
    updateByPath,
    handleImageUpload,
    handleAddContactInfo,
    handleAddSocials,
    handleDeleteContactInfo,
    handleDeleteSocials,
  };
}
