import { generateMetadata } from "@/config/Meta";
import { ViewTransitions } from "next-view-transitions";

export const metadata = generateMetadata("/");
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-hanken-grotesk antialiased `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
