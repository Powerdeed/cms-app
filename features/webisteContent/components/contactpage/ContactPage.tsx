"use client";

import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import ContactHeroSection from "./ContactHeroSection";
import ContactLocation from "./ContactLocation";
import ContactInformation from "./ContactInformation";
import WorkingHours from "./WorkingHours";
import SocialMedia from "./SocialMedia";

import useContactPage from "../../hooks/contactpage/useContactPage";

export default function ContactPage() {
  const { state, actions } = useContactPage();

  return (
    <div className="vertical-layout__outer">
      {state.loadingContacts && <Loader loadingTxt="Loading Contacts" />}

      <div
        className={`vertical-layout__outer border-(--secondary-blue) rounded-[10px] p-2.5 ${state.hasContactsChanged && "border-2"}`}
      >
        {state.hasContactsChanged && (
          <div className="text-style__small-text text-(--secondary-blue)">
            Changes have been made, save before exiting
          </div>
        )}
        <ContactHeroSection />

        <ContactLocation />

        <ContactInformation />

        <SocialMedia />

        <WorkingHours />
      </div>

      <div className="flex gap-2.5 items-center justify-end">
        <Button
          buttonType="light"
          buttonText="Reset Changes"
          clickAction={() => state.setRefreshContacts((prev) => !prev)}
          icon={state.loadingContacts && <Loader />}
          disabled={state.loadingContacts || state.updatingContacts}
        />

        <Button
          buttonText="Save All Changes"
          clickAction={actions.saveAllChanges}
          disabled={state.updatingContacts || state.loadingContacts}
        >
          {state.updatingContacts && <Loader />}
        </Button>
      </div>
    </div>
  );
}
