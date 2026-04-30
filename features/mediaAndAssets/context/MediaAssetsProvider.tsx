"use client";

import MediaAssetsErrorsProvider from "./MediaAssetsErrorsProvider";
import MediaAssetsProcessingProvider from "./MediaAssetsProcessingProvider";
import MediaAssetsProviderState from "./MediaAssetsProviderStates";
import MediaAssetsSearchProvider from "./MediaAssetsSearchProvider";

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
            {children}
          </MediaAssetsProcessingProvider>
        </MediaAssetsErrorsProvider>
      </MediaAssetsProviderState>
    </MediaAssetsSearchProvider>
  );
}
