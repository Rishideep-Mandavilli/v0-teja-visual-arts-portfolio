import type { Metadata } from 'next'
import { Cinzel, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400","600","700","900"] });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", style: ["normal","italic"] });

export const metadata: Metadata = {
  title: 'Teja Visual Arts — Cinematic Video Editing Studio',
  description: 'A cozy cinematic editing studio crafting emotional stories through film. Based in the warmth of golden hour, always.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/teja-visual-arts-logo-design.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/teja-visual-arts-logo-Design.png',
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
