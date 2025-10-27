import Navbar from "@/components/Navbar";
import ReactLenis from "lenis/react";
import "../globals.css";
import { SearchProvider } from "@/components/search-provider";
import { getSearchableBlogData } from "@/lib/blog";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blogSearchData = getSearchableBlogData();
  return (
    <SearchProvider blogPosts={blogSearchData}>
      <ReactLenis root>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </ReactLenis>
    </SearchProvider>
  );
}
