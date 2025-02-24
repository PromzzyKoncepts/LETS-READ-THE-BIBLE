"use client"
import {
    AppShell,
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from "@mantine/core";
import { useDisclosure, useLocalStorage, useWindowEvent } from "@mantine/hooks";
import MyNavbar from "../components/read/MyNavbar";
import MyHeader from "../components/read/MyHeader";
import { useState } from "react";
import Passage from "../components/read/Passage.js";
import { SearchModal } from "../components/read/SearchModal";
import '@mantine/core/styles.css';
import Navbar from "../components/read/Navbar";
const Read = () => {


    const [opened, setOpened] = useState(true);
    const [modalOpened, modalFn] = useDisclosure(false);
    useWindowEvent("keydown", (event) => {
        if (event.key === "/") {
            event.preventDefault();
            modalFn.open();
        }
        if (event.key === "Escape") {
            event.preventDefault();
            modalFn.close();
        }
    });

    return (
        <div className="flex">
            <Navbar />
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
        >
            <AppShell>
                <Passage open={modalFn.open} />
                {/* <SearchModal opened={modalOpened} close={modalFn.close} /> */}
            </AppShell>
        </MantineProvider></div>
    )
}

export default Read
