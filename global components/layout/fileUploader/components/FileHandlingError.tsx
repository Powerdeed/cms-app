"use client";

import Button from "@global components/ui/Button";
import useFileUploader from "../hooks/useFileUploader";

export default function FileHandlingError() {
  const { uploaderActions } = useFileUploader();

  return (
    <div className="feature-container-vertical h-full grid items-center justify-center text-style__body text-center">
      {uploaderActions.errorMsg}

      <Button
        buttonText="Re-upload file"
        clickAction={uploaderActions.resetErrors}
      />
    </div>
  );
}
