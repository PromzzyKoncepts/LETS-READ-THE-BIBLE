import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lets Read the Bible Campaign",
  description:
    "Join millions of kids and youths all over the world to read the bible with lets read the bible campaign for kids and teens of all ages. Watch fellow teens get enriched through the wisdom of the scriptures. A campaign under our Highly Esteemed Man of God, Pastor Chris Oyakhilome DSC, DD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Jua&family=Lexend:wght@100..900&family=Luckiest+Guy&family=Modak&family=Sniglet&family=Manrope:wght@200..800&display=swap" rel="stylesheet"/>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <canvas id="world" width="auto" height="auto"></canvas>
        <Header />
        {children}
        {/* Use next/script for including external JavaScript */}
        <Script src="./utils/PageAnimation.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
