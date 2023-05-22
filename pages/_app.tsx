import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';
// import '../styles/regi.css'
import type { AppProps } from 'next/app'
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
          session={pageProps.session}
        >
          <Toaster />
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  )
}

