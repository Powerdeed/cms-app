"use client";

import Button from "@global components/ui/Button";
import useMediaAssets from "../hooks/useAssets";

export default function AssetHandlingError() {
  const { actions } = useMediaAssets();

  return (
    <div className="feature-container-vertical h-full grid items-center justify-center text-style__body text-center">
      {actions.errorMsg}

      <Button
        buttonText="Re-upload file"
        clickAction={() => actions.handleResetAssetStates("re-upload")}
      />
    </div>
  );
}
