import { generateMetadata } from "@/config/Meta";
import "./globals.css";

export const metadata = generateMetadata("/");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-hanken-grotesk antialiased`}>{children}</body>
    </html>
  );
}
