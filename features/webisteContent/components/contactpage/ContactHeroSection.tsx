"use client";

import { useContactPage } from "@features/webisteContent";
import FormWrapper, { InputArea } from "@global components/layout/FormWrapper";
import LinkedAssetField from "../LinkedAssetField";

export default function ContactHeroSection() {
  const { state, actions } = useContactPage();

  if (!state.contacts) return;

  return (
    <FormWrapper subtitle="Hero Section">
      <LinkedAssetField
        label="Hero Image"
        value={state.contacts.Hero.image}
        uploadPath="contact/hero"
        onChange={(asset) => actions.updateByPath(["Hero", "image"], asset)}
      />

      <InputArea
        label="Hero Title"
        val={state.contacts.Hero.title}
        changeFunc={(val) => actions.updateByPath(["Hero", "title"], val)}
      />

      <InputArea
        label="Hero Subtitle"
        val={state.contacts.Hero.subtitle}
        changeFunc={(val) => actions.updateByPath(["Hero", "subtitle"], val)}
      />
    </FormWrapper>
  );
}
