import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell">
      <TopBar
        orgName="Anvil Labs"
        userName="John Bennett"
        userRole="Admin"
      />

      <div className="app-body">
        {/* <Sidebar /> */}

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}