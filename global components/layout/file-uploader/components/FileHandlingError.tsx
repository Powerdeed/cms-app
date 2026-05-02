"use client";

import Button from "@global components/ui/Button";

type FileHandlingErrorProps = {
  errorMsg: string;
  retryLabel?: string;
  onRetry: () => void;
};

export default function FileHandlingError({
  errorMsg,
  retryLabel = "Re-upload file",
  onRetry,
}: FileHandlingErrorProps) {
  return (
    <div className="feature-container-vertical h-full grid items-center justify-center text-style__body text-center">
      {errorMsg}

      <Button buttonText={retryLabel} clickAction={onRetry} />
    </div>
  );
}
