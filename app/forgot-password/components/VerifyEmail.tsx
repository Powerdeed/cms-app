"use client";

import { SectionTitle } from "@global components/ui/Title";
import useForgotPassword from "../hooks/useForgotPassword";
import useInputCode from "../hooks/useInputChange";
import { CODE_DIGITS_NUMBER } from "../constants/numberOfDigitsInCode";
import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";

export default function VerifyEmail() {
  const { state, actions } = useForgotPassword();
  const { inputsRef, handleChange, handleKeyDown } = useInputCode();

  return (
    <div className="feature-container-vertical w-100 text-center">
      <SectionTitle title="Please enter OTP code" />

      <div>We have sent you a 6 digit code to your email</div>

      <div className="flex items-center gap-2.5 justify-center">
        {Array.from({ length: CODE_DIGITS_NUMBER }, (_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            disabled={state.verifying}
            maxLength={1}
            value={state.code[i]}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="input-style w-10 text-center"
          />
        ))}
      </div>

      <div className="text-style__link flex items-center justify-center gap-5">
        <Button
          buttonText="Back to login"
          clickAction={actions.handleRouteBackToLogin}
          disabled={state.verifying || state.sendingCode}
          className="w-30"
        />

        <ButtonLight
          buttonText={
            state.timer === "00:00" ? "Resend code" : String(state.timer)
          }
          disabled={state.timer !== "00:00" || state.sendingCode}
          clickAction={() => {
            if (state.timer === "00:00") actions.handleCodeResend();
          }}
          className="w-30"
        />

        {state.verifying && <Loader />}
      </div>

      {state.sendingCodeError && (
        <div className="text-(--primary-red) text-center">
          {state.sendingCodeError}
        </div>
      )}
    </div>
  );
}
