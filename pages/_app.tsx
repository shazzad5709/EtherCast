import '../styles/globals.css'
import '../styles/regi.css'
import type { AppProps } from 'next/app'
import '../styles/welcome.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
