import OverviewProvider from "./context/DashboardProvider";

import { DashboardView } from "./components/DashboardView";

export default function Dashboard() {
  return (
    <OverviewProvider>
      <DashboardView />
    </OverviewProvider>
  );
}
