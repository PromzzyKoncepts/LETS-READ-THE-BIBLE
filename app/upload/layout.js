import Script from "next/script";
import "@/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";



export const metadata = {
    title: "Lets Read the Bible | UPLOAD VIDEO",
    description:
        "UPLOAD | Join millions of kids and youths all over the world to read the bible with lets read the bible campaign for kids and teens of all ages. Watch fellow teens get enriched through the wisdom of the scriptures. A campaign under our Highly Esteemed Man of God, Pastor Chris Oyakhilome DSC, DD",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Jua&family=Lexend:wght@100..900&family=Luckiest+Guy&family=Modak&family=Sniglet&family=Manrope:wght@200..800&display=swap" rel="stylesheet" />

            </head>
            <body
                className={` antialiased`}
            >
                <Header />
                {children}
                {/* <Footer /> */}
                {/* Use next/script for including external JavaScript */}
            </body>
        </html>
    );
}
