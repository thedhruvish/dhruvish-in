import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProviders";
import ReactLenis from "lenis/react";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactLenis root>
        <Navbar isSearch={false} />
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}
