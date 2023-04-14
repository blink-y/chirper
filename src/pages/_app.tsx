import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContextProvider } from '@/contexts/AppContext'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import ThemeButton from '@/components/Common/ThemeButton'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Router from 'next/router'

export default function App ({ Component, pageProps: { ...pageProps } }: AppProps) {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  React.useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start()
    }

    const handleRouteChangeComplete = () => {
      NProgress.done()
    }

    const handleRouteChangeError = () => {
      NProgress.done()
    }

    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)
    Router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeComplete)
      Router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [])

  if (!hasMounted) {
    return null
  }
  return (
    <ThemeProvider attribute="class">
      <AppContextProvider>
        <Component {...pageProps} className="bg-white dark:bg-slate-800" />
        <ThemeButton />
      </AppContextProvider>
    </ThemeProvider>
  )
}
