// 'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useState } from 'react';
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

// export default function Providers({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 60 * 1000,
//             refetchOnWindowFocus: false,
//           },
//         },
//       }),
//   );

//   return (
//     <AppRouterCacheProvider>
//       <QueryClientProvider client={queryClient}>
//         {children}
//       </QueryClientProvider>
//     </AppRouterCacheProvider>
//   );
// }

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);

    setThemeReady(true);
  }, []);

  if (!themeReady) {
    return null;
  }

  return (
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}