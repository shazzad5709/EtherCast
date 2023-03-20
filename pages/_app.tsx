import '../styles/globals.css'
// import '../styles/regi.css'
import type { AppProps } from 'next/app'
import '../styles/welcome.css'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient } from 'react-query';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
// import '../styles/dashboard.css'

// create a client
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider
          // Provider options are not required but can be useful in situations where
          // you have a short session maxAge time. Shown here with default values.
          session={pageProps.session}
        >
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  )
}

