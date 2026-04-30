import ServiceProvider from "./context/serviceProvider";
import { ServicesManagementView } from "./components/ServicesManagantView";
import MediaAssetsProvider from "@features/mediaAndAssets/context/MediaAssetsProvider";

export default function ServicesManagement() {
  return (
    <MediaAssetsProvider>
      <ServiceProvider>
        <ServicesManagementView />
      </ServiceProvider>
    </MediaAssetsProvider>
  );
}
