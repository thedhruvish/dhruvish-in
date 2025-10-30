import { generateMetadata } from "@/config/Meta";
import { ViewTransitions } from "next-view-transitions-react-19";
import { GoogleAnalytics } from "@next/third-parties/google";
import Clarity from "@microsoft/clarity";

export const metadata = generateMetadata("/");
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProviders";

Clarity.init(process.env.NEXT_PUBLIC_MS_CLARITY!);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <meta name="apple-mobile-web-app-title" content="dhruvish" />
        <meta name="application-name" content="dhruvish" />
        <body className={`font-hanken-grotesk antialiased `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
