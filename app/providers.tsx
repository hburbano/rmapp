'use client'

import { useMemo } from 'react'
import { Provider as JotaiProvider } from 'jotai'
import {
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
  UrqlProvider,
} from '@urql/next'

import { API_URL } from '@graphql/client'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    })
    const client = createClient({
      url: API_URL,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    })

    return [client, ssr]
  }, [])

  return (
    <JotaiProvider>
      <UrqlProvider client={client} ssr={ssr}>
        {children}
      </UrqlProvider>
    </JotaiProvider>
  )
}
