"use client";

import { useContactPage } from "@features/webisteContent";
import FormWrapper, { InputArea } from "@global components/layout/FormWrapper";

export default function ContactLocation() {
  const { state, actions } = useContactPage();

  if (!state.contacts) return;

  const { Address, ...otherLocData } = state.contacts.Location;

  return (
    <FormWrapper subtitle="Location">
      <InputArea
        label="Address"
        val={Address}
        changeFunc={(val) => actions.updateByPath(["Location", "Address"], val)}
      />

      <div className="grid grid-cols-3 gap-2.5">
        {Object.entries(otherLocData).map(([key, data]) => (
          <div key={key}>
            <InputArea
              label={key}
              val={data}
              changeFunc={(val) => actions.updateByPath(["Location", key], val)}
            />
          </div>
        ))}
      </div>
    </FormWrapper>
  );
}
