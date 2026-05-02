"use client";

import MediaAssetsProviderState from "./MediaAssetsProviderStates";
import MediaAssetsSearchProvider from "./MediaAssetsSearchProvider";
import { FileUploaderProvider } from "@global components/layout/file-uploader";

export default function MediaAssetsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MediaAssetsSearchProvider>
      <MediaAssetsProviderState>
        <FileUploaderProvider>{children}</FileUploaderProvider>
      </MediaAssetsProviderState>
    </MediaAssetsSearchProvider>
  );
}
