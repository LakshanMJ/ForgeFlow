// import './globals.css';
// import Providers from './providers';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }


// import './globals.css';
// import Providers from './providers';
// import Script from 'next/script';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <Script id="theme-script" strategy="beforeInteractive">
//           {`
//             (function () {
//               const theme = localStorage.getItem('theme') || 'light';
//               document.documentElement.setAttribute('data-theme', theme);
//             })();
//           `}
//         </Script>
//       </head>

//       <body>
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }


// import './globals.css';
// import Providers from './providers';
// import Script from 'next/script';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <Script id="theme-script" strategy="beforeInteractive">
//           {`
//             (function () {
//               const theme = localStorage.getItem('theme') || 'light';
//               document.documentElement.setAttribute('data-theme', theme);
//             })();
//           `}
//         </Script>
//       </head>

//       <body>
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }

// import './globals.css';
// import Providers from './providers';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               (function () {
//                 const theme = localStorage.getItem('theme') || 'light';
//                 document.documentElement.setAttribute('data-theme', theme);
//               })();
//             `,
//           }}
//         />
//       </head>

//       <body>
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }

import './globals.css';
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}