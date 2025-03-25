import "./globals.css";
import Header from "./components/Header";
import BottomBar from "@/app/components/MobileNav";
import { Suspense } from 'react'

export const metadata = {
  title: "Lets Read the Bible Campaign",
  description:
    "Join millions of kids and youths worldwide in Lets read the bible, a Loveworld children’s website, featuring engaging kiddies’ cartoons, animations, and Bible-based programs. Explore the Let’s Read the Bible campaign, designed for kids and teens of all ages, and discover the wisdom of the scriptures through fun and interactive content. A transformative initiative under the guidance of our Highly Esteemed Man of God, Pastor Chris Oyakhilome DSC, DD.",
    icons: {
      icon: "/readthebible.ico", 
    },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="icon" href="/public/readthebible.ico"/>
        <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Jua&family=Lexend:wght@100..900&family=Luckiest+Guy&family=Modak&family=Sniglet&family=Manrope:wght@200..800&display=swap" rel="stylesheet" />

      </head>
      <body
        className={` antialiased`}
      >
        <canvas id="world" width="0" height="0"></canvas>
        <Header />
        <Suspense>
        {children}
        </Suspense>
        <div className="fixed z-[999] block md:hidden bottom-0"><BottomBar /></div>
      </body>
    </html>
  );
}
