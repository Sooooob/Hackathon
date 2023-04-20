import "~/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import "material-icons/iconfont/material-icons.css";
import { GameContextProvider } from "~/context/gameContext";
import { TimeContextProvider } from "~/context/timeContext";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <GameContextProvider>
                <TimeContextProvider>
                    <Component {...pageProps} />
                </TimeContextProvider>
            </GameContextProvider>
        </SessionProvider>
    );
}
