"use client";

import { useContactPage } from "@features/webisteContent";
import FormWrapper, { InputArea } from "@global components/layout/FormWrapper";
import { ButtonLight } from "@global components/ui/Button";

export default function ContactHeroSection() {
  const { state, actions } = useContactPage();

  if (!state.contacts) return;

  return (
    <FormWrapper subtitle="Hero Section">
      <InputArea
        label="Hero Image"
        val={state.contacts.Hero.image}
        changeFunc={(val) => actions.updateByPath(["Hero", "image"], val)}
      >
        <ButtonLight
          buttonText="Upload"
          clickAction={actions.handleImageUpload}
        />
      </InputArea>

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
