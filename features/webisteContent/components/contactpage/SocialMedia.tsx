"use client";

import Button, { DeleteIconBtn } from "@global components/ui/Button";
import FormWrapper, { InputArea } from "@global components/layout/FormWrapper";

import { useContactPage } from "@features/webisteContent";

export default function SocialMedia() {
  const { state, actions } = useContactPage();

  if (!state.contacts) return;

  return (
    <FormWrapper
      subtitle="Social Media"
      subtitleChildren={
        <Button
          buttonText="+ Add Platform"
          clickAction={actions.handleAddSocials}
        />
      }
    >
      {state.contacts.Socials.map((socialPlatform, idx) => (
        <div key={idx} className="flex gap-2.5">
          <div className="w-full vertical-layout__inner">
            <InputArea
              label=""
              val={socialPlatform.name}
              changeFunc={(val) =>
                actions.updateByPath(["Socials", idx, "name"], val)
              }
            />

            <InputArea
              label=""
              val={socialPlatform.url}
              changeFunc={(val) =>
                actions.updateByPath(["Socials", idx, "url"], val)
              }
            />
          </div>

          <DeleteIconBtn deleteFunc={() => actions.handleDeleteSocials(idx)} />
        </div>
      ))}
    </FormWrapper>
  );
}
