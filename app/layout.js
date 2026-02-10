import "./globals.css";
import Header from "./components/Header";
import BottomBar from "./components/MobileNav";
import { Suspense } from "react";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link rel="icon" href="/public/readthebible.ico" />
        {/* <link
          rel="preload"
          href="https://www.crazygames.com/embed/traffic-rider-vvq"
          as="document"
          crossOrigin="anonymous"
        /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Jua&family=Lexend:wght@100..900&family=Luckiest+Guy&family=Modak&family=Sniglet&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
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
