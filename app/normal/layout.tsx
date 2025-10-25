import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProviders";
import ReactLenis from "lenis/react";
import { ViewTransitions } from "next-view-transitions";
import "../globals.css";
import { SearchProvider } from "@/components/search-provider";
import {  getSearchableBlogData } from "@/lib/blog";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const blogSearchData = getSearchableBlogData();
  return (
    <ViewTransitions>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SearchProvider blogPosts={blogSearchData}>
          <ReactLenis root>
            <Navbar />
            {children}
          </ReactLenis>
        </SearchProvider>
      </ThemeProvider>
    </ViewTransitions>
  );
}
