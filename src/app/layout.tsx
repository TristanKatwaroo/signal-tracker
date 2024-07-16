import type { Metadata } from "next";
import { Outfit as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import { cn } from "@/lib/utils";
// import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer"; // Import Footer

const fontSans = FontSans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SIGNALTRACKER.GG",
  description: "Community-made utility for Zenless Zone Zero",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(fontSans.className, {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        {/* <AuthProvider> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col">
              <MobileHeader />
              <div className="flex flex-grow">
                <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                  <Sidebar />
                </div>
                <div className="flex flex-col flex-grow stripe-pattern">
                  <main className="flex-grow max-w-7xl 2xl:max-w-[100rem] mx-auto w-full px-4 md:px-6 lg:px-8 py-6">
                    {children}
                  </main>
                  <Footer />
                </div>
              </div>
            </div>
          </ThemeProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
