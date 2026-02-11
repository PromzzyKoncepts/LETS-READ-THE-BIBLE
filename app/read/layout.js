"use client";
// import { MantineProvider } from "@mantine/core";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { MantineEmotionProvider } from "@mantine/emotion";
import Header from "/app/components/Header";
import BottomBar from "/app/components/MobileNav";

// Create an Emotion cache
const cache = createCache({ key: "mantine", prepend: false });

export default function RootLayout({ children }) {
  return (
    <CacheProvider value={cache}>
      <MantineEmotionProvider withGlobalStyles withNormalizeCSS>
        <Header />
        {children}
        <div className="fixed z-[999] block md:hidden bottom-0">
          <BottomBar />
        </div>
      </MantineEmotionProvider>
    </CacheProvider>
  );
}
