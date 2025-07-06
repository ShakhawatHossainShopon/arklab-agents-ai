import { ClientAgentList } from "@/components/shared/ClientAgentList";
import { getAgents } from "@/services/agents";
import { store } from "@/store";
export default async function AgentsPage() {
  await store.dispatch(getAgents());
  const agents = store.getState().agents.data;
  const loading = store.getState().agents.loading;
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(14 12 21)] bg-opacity-80">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return <ClientAgentList agentsFromServer={agents} />;
}
