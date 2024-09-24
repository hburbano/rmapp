'use client'

import { useState } from 'react'
import { Provider as JotaiProvider } from 'jotai'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(new QueryClient())

  return (
    <JotaiProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </JotaiProvider>
  )
}
