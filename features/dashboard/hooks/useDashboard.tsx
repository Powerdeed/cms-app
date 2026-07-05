import useStates from "./useStates";
import useGraphs from "./useGraphs";
import useActivities from "./useActivities";
import useInquiries from "./useInquiries";

export default function useOverviewDashboard() {
  const state = useStates();
  const activities = useActivities();
  const inquiries = useInquiries();
  const graphs = useGraphs();

  return { state, graphs, actions: { ...activities, ...inquiries } };
}
