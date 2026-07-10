import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import LiveMatchCard from "@/components/dashboard/LiveMatchCard";
import OddsPanel from "@/components/dashboard/OddsPanel";
import SignalFeed from "@/components/dashboard/SignalFeed";
import AIReasoning from "@/components/dashboard/AIReasoning";
import MatchList from "@/components/dashboard/MatchList";

export default function DashboardPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          padding: 24,
        }}
      >
        <Header />

        <div
          style={{
            display: "grid",
            gap: 20,
            marginTop: 20,
          }}
        >
          <LiveMatchCard />

          <MatchList />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            <OddsPanel />
            <AIReasoning />
          </div>

          <SignalFeed />
        </div>
      </main>
    </div>
  );
}
