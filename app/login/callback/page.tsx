"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { SectionTitle } from "@global components/ui/Title";

export default function LoginCallbackPage() {
  const router = useRouter();
  const hasExchangedCode = useRef(false);
  const [status, setStatus] = useState("Completing identity login...");
  const [exchangeError, setExchangeError] = useState("");

  useEffect(() => {
    if (hasExchangedCode.current) return;

    const exchangeCode = async () => {
      try {
        setStatus("Reading Keycloak login response...");

        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const returnedState = searchParams.get("state");

        if (error) {
          throw new Error(
            `Keycloak returned an authentication error: ${error}`,
          );
        }

        if (!code) {
          setStatus("Waiting for the identity login response.");
          return;
        }

        setStatus("Validating login state...");
        const expectedState = sessionStorage.getItem("keycloak_oauth_state");

        if (!expectedState || returnedState !== expectedState) {
          throw new Error("Invalid login state. Start the login flow again.");
        }

        hasExchangedCode.current = true;
        setStatus("Requesting access tokens from Keycloak...");

        setStatus("Saving identity session...");
        setStatus("Identity login completed successfully.");

        const returnTo = sessionStorage.getItem("keycloak_return_to") || "/";
        sessionStorage.removeItem("keycloak_return_to");
        router.replace(returnTo.startsWith("/") ? returnTo : "/");
      } catch (err) {
        setExchangeError(
          err instanceof Error
            ? err.message
            : "Unable to complete the identity login.",
        );
      }
    };

    void exchangeCode();
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <section className="feature-container-vertical w-full max-w-110 text-center">
        <SectionTitle title="PTR CMS" style="text-center" />

        <p
          className={`text-style__body ${
            exchangeError ? "text-(--primary-red)" : "text-(--primary-grey)"
          }`}
        >
          {exchangeError || status}
        </p>
      </section>
    </main>
  );
}
