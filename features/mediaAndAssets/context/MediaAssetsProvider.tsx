"use client";

import MediaAssetsErrorsProvider from "./MediaAssetsErrorsProvider";
import MediaAssetsProcessingProvider from "./MediaAssetsProcessingProvider";
import MediaAssetsProviderState from "./MediaAssetsProviderStates";
import MediaAssetsSearchProvider from "./MediaAssetsSearchProvider";
import MediaAssetsUploadingProvider from "./MediaAssetsUploadingProvider";

export default function MediaAssetsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MediaAssetsSearchProvider>
      <MediaAssetsProviderState>
        <MediaAssetsErrorsProvider>
          <MediaAssetsProcessingProvider>
            <MediaAssetsUploadingProvider>
              {children}
            </MediaAssetsUploadingProvider>
          </MediaAssetsProcessingProvider>
        </MediaAssetsErrorsProvider>
      </MediaAssetsProviderState>
    </MediaAssetsSearchProvider>
  );
}
