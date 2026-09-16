"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Filter out React 19's harmless script tag warnings in development console
    if (process.env.NODE_ENV === "development") {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const msg = args[0];
        if (
          typeof msg === "string" &&
          (msg.includes("Encountered a script tag while rendering React component") ||
           msg.includes("Scripts inside React components are never executed"))
        ) {
          return;
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
