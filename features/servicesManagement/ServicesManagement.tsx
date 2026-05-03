import ServiceProvider from "./context/serviceProvider";
import { ServicesManagementView } from "./components/ServicesManagantView";

export default function ServicesManagement() {
  return (
    <ServiceProvider>
      <ServicesManagementView />
    </ServiceProvider>
  );
}
