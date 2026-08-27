"use client";

import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import { store } from "@/store";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { theme } from "@/styles/theme";

export default function Providers({
  children,
}: PropsWithChildren) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </QueryClientProvider>
    </Provider>
  );
}