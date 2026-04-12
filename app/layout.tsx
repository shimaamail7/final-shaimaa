import type { Metadata } from 'next'
import { Geist, Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'


const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: 'Optika ',
  description: 'Where precision meets artistry. Premium eyewear crafted with innovative engineering and timeless elegance.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains used by the app — eliminates TCP handshake latency */}
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        {/* Preload the local 3D model so it starts downloading before JS executes */}
        <link
          rel="preload"
          href="/AkshtaS%20spetcs2.glb"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      {/* Apply the font variables to the body so they can be accessed anywhere */}
      <body className={`${inter.className} ${geist.className}  ${playfair.variable} antialiased`} suppressHydrationWarning>

        {children}
        <Analytics />

      </body>
    </html>
  )
}
