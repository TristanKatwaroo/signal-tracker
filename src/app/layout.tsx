// app/layout.tsx or the main layout component
import type { Metadata } from "next";
import { Outfit as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer"; // Import Footer
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import { keywords } from "@/lib/keywords";
import imagesConfig from "@/lib/imagesConfig";

export const runtime = "edge";

const fontSans = FontSans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://signaltracker.gg'),
  keywords,
  title: {
    default: 'Zenless Zone Zero Tools | SIGNALTRACKER.GG',
    template: `%s | SIGNALTRACKER.GG`
  },
  description: 'SIGNALTRACKER.GG is a utility app for Zenless Zone Zero, featuring signal tracking, gacha pull analysis, and more!',
  twitter: {
    card: 'summary_large_image'
  },
  // openGraph: {
  //   images: [
  //     {
  //       url: imagesConfig.thumbnails.cunninghares1,
  //       alt: 'Hero image for SIGNALTRACKER.GG',
  //       width: 1366,
  //       height: 768,
  //     }
  //   ],
  // }
};

export default function RootLayout({
  children,
  showSidebar = true,
}: {
  children: React.ReactNode;
  showSidebar?: boolean;
}) {
  return (
    <html lang="en">
      <body
        className={cn(fontSans.className, {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2435366797773008"
          crossOrigin="anonymous"
        ></Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {showSidebar && <MobileHeader />}
            <div className="flex flex-grow">
              {showSidebar ? (
                <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] flex-grow">
                  <Sidebar />
                  <div className="flex flex-col flex-grow stripe-pattern">
                    <main className="flex-grow max-w-7xl 2xl:max-w-[100rem] mx-auto w-full px-4 md:px-6 lg:px-8 py-8">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </div>
              ) : (
                <main className="flex-grow max-w-7xl 2xl:max-w-[100rem] mx-auto w-full px-4 md:px-6 lg:px-8 py-8">
                  {children}
                </main>
              )}
            </div>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
