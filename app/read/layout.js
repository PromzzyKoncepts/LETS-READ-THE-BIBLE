"use client";
// import { MantineProvider } from "@mantine/core";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { MantineEmotionProvider } from "@mantine/emotion";

// Create an Emotion cache
const cache = createCache({ key: "mantine", prepend: false });

export default function RootLayout({ children }) {
  return (
    <CacheProvider value={cache}>
      <MantineEmotionProvider withGlobalStyles withNormalizeCSS>
        {children}
      </MantineEmotionProvider>
    </CacheProvider>
  );
}
