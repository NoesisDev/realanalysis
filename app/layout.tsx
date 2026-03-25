import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Propvest | Professional Real Estate Investment Analysis',
  description: 'Professional-grade real estate investment analysis made accessible. Explore detailed reports on international property investments, build portfolios, and make informed decisions.',
  keywords: ['real estate', 'investment', 'property', 'international', 'reports', 'rental yield', 'capital appreciation', 'portfolio'],
  authors: [{ name: 'Propvest' }],
  openGraph: {
    title: 'Propvest | Professional Real Estate Investment Analysis',
    description: 'Professional-grade real estate investment analysis made accessible and easy to understand.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Propvest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Propvest | Professional Real Estate Investment Analysis',
    description: 'Professional-grade real estate investment analysis made accessible and easy to understand.',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a365d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
