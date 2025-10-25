import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProviders";
import ReactLenis from "lenis/react";
import { ViewTransitions } from "next-view-transitions";

import "../globals.css";
import { SearchProvider } from "@/components/search-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SearchProvider>
          <ReactLenis root>
            <Navbar />
            {children}
          </ReactLenis>
        </SearchProvider>
      </ThemeProvider>
    </ViewTransitions>
  );
}
