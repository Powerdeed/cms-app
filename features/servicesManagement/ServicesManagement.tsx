import ServiceProvider from "./context/serviceProvider";
import { ServicesManagementView } from "./components/ServicesManagantView";
import { FileUploaderProvider } from "@global components/layout/file-uploader";

export default function ServicesManagement() {
  return (
    <FileUploaderProvider>
      <ServiceProvider>
        <ServicesManagementView />
      </ServiceProvider>
    </FileUploaderProvider>
  );
}
