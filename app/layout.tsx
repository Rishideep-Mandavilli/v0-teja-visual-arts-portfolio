import type { Metadata } from 'next'
import { Cinzel, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400","600","700","900"] });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", style: ["normal","italic"] });

export const metadata: Metadata = {
  title: 'Teja Visual Arts — Cinematic Video Editing Studio',
  description: 'A cozy cinematic editing studio crafting emotional stories through film. Based in the warmth of golden hour, always.',
  generator: 'Rishideep-Mandavilli',
  icons: {
    icon: [
      {
        url: '/teja-visual-arts-logo-design.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/teja-visual-arts-logo-design.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/teja-visual-arts-logo-design.png',
  },
  openGraph: {
    title: 'Teja Visual Arts',
    description: 'Cinematic storytelling through editing & color',
    url: 'https://teja-visual-arts-portfolio.vercel.app/',
    siteName: 'Teja Visual Arts',
    images: [
      {
        url: '/teja-visual-arts-logo-design.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Teja Visual Arts',
    description: 'Cinematic storytelling through editing & color',
    images: ['/teja-visual-arts-logo-design.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
