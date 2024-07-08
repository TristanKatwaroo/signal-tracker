import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer"; // Import Footer

const fontSans = FontSans({
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
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen w-full flex flex-col">
              <div className="grid flex-grow md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <Sidebar />
                <div className="flex flex-col md:grid md:grid-cols-[1fr_auto]">
                  <MobileHeader />
                  <div className="flex flex-col flex-grow">{children}
                  <Footer /></div>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
