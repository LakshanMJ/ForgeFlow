import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell" data-theme="dark">
      <TopBar
        orgName="Anvil Labs"
        userName="Lakshan"
        userRole="Admin"
      />

      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}