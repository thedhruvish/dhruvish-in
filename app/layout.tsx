import { generateMetadata } from "@/config/Meta";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
export const metadata = generateMetadata("/");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-hanken-grotesk antialiased page-fade-in`}>{children}</body>
      </html>
    </ViewTransitions>
  );
}
