import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import BottomBar from "@/app/components/MobileNav";


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
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
<link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Jua&family=Lexend:wght@100..900&family=Luckiest+Guy&family=Modak&family=Sniglet&family=Manrope:wght@200..800&display=swap" rel="stylesheet"/>

      </head>
      <body
        className={` antialiased`}
      >
        <canvas id="world" width="0" height="0"></canvas>
        <Header />
        {children}
        <div className="fixed z-[999] block md:hidden bottom-0"><BottomBar/></div>
        <Script src="./utils/PageAnimation.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
