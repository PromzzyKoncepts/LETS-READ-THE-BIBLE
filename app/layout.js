import "./globals.css";
import Header from "./components/Header";
import BottomBar from "./components/MobileNav";
import { Suspense } from "react";
import HitTracker from "./components/HitTracker";
import Script from "next/script";

export const metadata = {
  title: "Lets Read the Bible Campaign",
  description: "Join millions of kids and youths worldwide...",
  icons: {
    icon: "/readthebible.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18095163161"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18095163161');
          `}
        </Script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        {/* FIXED favicon path */}
        <link rel="icon" href="/readthebible.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Jua&family=Lexend:wght@100..900&family=Luckiest+Guy&family=Modak&family=Sniglet&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="antialiased">
        <HitTracker />
        <canvas id="world" width="0" height="0"></canvas>
        <Header />
        <Suspense>{children}</Suspense>

        <div className="fixed z-[999] block md:hidden bottom-0">
          <BottomBar />
        </div>
      </body>
    </html>
  );
}
