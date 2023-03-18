import '../styles/globals.css'
// import '../styles/regi.css'
import type { AppProps } from 'next/app'
import '../styles/welcome.css'
import { SessionProvider } from 'next-auth/react'
// import '../styles/dashboard.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
