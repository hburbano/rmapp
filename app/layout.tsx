import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { Providers } from './providers'

import { Navbar } from '@components/Navbar'

import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty',
  openGraph: {
    title: 'Rick and Morty Character Explorer',
    description:
      'Explore the vast universe of Rick and Morty characters. Discover detailed information about your favorite characters from the show.',
    type: 'website',
    url: 'https://rickandmorty-explorer.com',
    siteName: 'Rick and Morty Character Explorer',
    locale: 'en_US',
    images: [
      {
        url: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
