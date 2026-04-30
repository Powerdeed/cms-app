"use client";

import { MediaAssetsView } from "./components/MediaAssetsView";
import MediaAssetsProvider from "./context/MediaAssetsProvider";

export default function MediaAndAssets() {
  return (
    <MediaAssetsProvider>
      <MediaAssetsView />
    </MediaAssetsProvider>
  );
}
