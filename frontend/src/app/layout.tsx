import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';
import './globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}