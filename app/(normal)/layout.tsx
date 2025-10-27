import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProviders";
import ReactLenis from "lenis/react";
import "../globals.css";
import { SearchProvider } from "@/components/search-provider";
import { getSearchableBlogData } from "@/lib/blog";
import { Footer } from "@/components/Footer";
import Container from "@/components/Container";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blogSearchData = getSearchableBlogData();
  return (
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
          <Container>
            <Footer />
          </Container>
          <Toaster />
        </ReactLenis>
      </SearchProvider>
    </ThemeProvider>
  );
}
