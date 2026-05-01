import { ReactNode, useState } from "react";

import { mediaAssetsUploadingContext } from "./MediaAssetsUploadingContext";

export default function MediaAssetsUploadingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [uploadingAsset, setUploadingAsset] = useState(false);
  const [errorUploadingAsset, setErrorUploadingAsset] = useState(false);
  const [errorUploadingAssetMsg, setErrorUploadingAssetMsg] = useState("");

  return (
    <mediaAssetsUploadingContext.Provider
      value={{
        uploadingAsset,
        setUploadingAsset,
        errorUploadingAsset,
        setErrorUploadingAsset,
        errorUploadingAssetMsg,
        setErrorUploadingAssetMsg,
      }}
    >
      {children}
    </mediaAssetsUploadingContext.Provider>
  );
}
