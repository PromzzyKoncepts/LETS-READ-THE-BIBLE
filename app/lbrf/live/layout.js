import "@/app/globals.css";
import Header from "@/app/components/Header";
import BottomBar from "@/app/components/MobileNav";
// import { SocketProvider } from '@/app/lib/SocketContext'

export const metadata = {
    title: "Lets Read the Bible Campaign | Live",
    description: "Join millions of kids and youths worldwide...",
    icons: {
        icon: "../../readthebible.ico",
    },
};

export default function RootLayout({ children }) {
    return (

        <div className={`antialiased`}>
            <canvas id="world" width="0" height="0"></canvas>
            <Header />
                    {children}
            <div className="fixed z-[999] block md:hidden bottom-0"><BottomBar /></div>
        </div>
    );
}