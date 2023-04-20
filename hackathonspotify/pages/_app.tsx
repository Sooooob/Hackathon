import '~/styles/globals.css'

import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app'

import 'material-icons/iconfont/material-icons.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps ) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
