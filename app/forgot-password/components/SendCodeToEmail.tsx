"use client";

import { SectionTitle } from "@global components/ui/Title";
import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";

import useForgotPassword from "../hooks/useForgotPassword";

export default function SendCodeToEmail() {
  const { state, actions } = useForgotPassword();

  return (
    <div className="feature-container-vertical w-100 text-center">
      <SectionTitle title="Enter email to send OTP code" />

      <input
        className="input-style"
        value={state.email}
        disabled={state.sendingCode}
        onChange={(e) => state.setEmail(e.target.value)}
      />

      <Button
        buttonText="Send OTP"
        clickAction={actions.handleSendCodeToEmail}
        disabled={state.sendingCode}
      >
        {state.sendingCode && <Loader />}
      </Button>

      {state.emailExistsError && (
        <div className="text-(--primary-red) text-center">
          {state.emailExistsError}
        </div>
      )}
    </div>
  );
}
