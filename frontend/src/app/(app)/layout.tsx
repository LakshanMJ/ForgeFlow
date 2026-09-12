// import TopBar from '@/components/TopBar';
// import Sidebar from '@/components/Sidebar';

// export default function AppLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="app-shell">
//       <script
//         dangerouslySetInnerHTML={{
//           __html: `
//       (function () {
//         const theme = localStorage.getItem('theme') || 'light';
//         document.documentElement.setAttribute('data-theme', theme);
//       })();
//     `,
//         }}
//       />
//       <TopBar
//         orgName="Anvil Labs"
//         userName="Lakshan"
//         userRole="Admin"
//       />

//       <div className="app-body">
//         <Sidebar />

//         <main className="main-content">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


// import Script from "next/script";
// import TopBar from "@/components/TopBar";
// import Sidebar from "@/components/Sidebar";

// export default function AppLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="app-shell">
//       <Script
//         id="theme-script"
//         strategy="beforeInteractive"
//       >
//         {`
//           (function () {
//             const theme = localStorage.getItem('theme') || 'light';
//             document.documentElement.setAttribute('data-theme', theme);
//           })();
//         `}
//       </Script>

//       <TopBar
//         orgName="Anvil Labs"
//         userName="Lakshan"
//         userRole="Admin"
//       />

//       <div className="app-body">
//         <Sidebar />

//         <main className="main-content">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


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