import type { Metadata } from 'next'
import { Inter, Bangers, Press_Start_2P } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

// Optimize fonts with Next.js Font Optimization
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '600', '800'],
  display: 'swap',
  variable: '--font-inter',
})

const bangers = Bangers({ 
  subsets: ['latin'], 
  weight: ['400'],
  display: 'swap',
  variable: '--font-bangers',
})

const pressStart2P = Press_Start_2P({ 
  subsets: ['latin'], 
  weight: ['400'],
  display: 'swap',
  variable: '--font-press-start-2p',
})

export const metadata: Metadata = {
  title: 'Karate Bros - Play Karate Bros IO Game Online Free | Unblocked',
  description: 'Play Karate Bros online! The official Karate Bros game unblocked. Master the controls, learn strategies, and join the Karate Bros io arena. Fun for everyone.',
  keywords: ['karate bros', 'karate bros game', 'karate bros online', 'karate bros io', 'karate bros unblocked', 'karate bros crazy games', 'karate bros official', 'karate bros girl'],
  authors: [{ name: 'Karate Bros' }],
  creator: 'Karate Bros',
  publisher: 'Karate Bros',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://karatebrosgame.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Karate Bros - Play Official Karate Bros Game Online | Unblocked',
    description: 'Play Karate Bros online! The official Karate Bros game unblocked. Master the controls, learn strategies, and join the Karate Bros io arena.',
    url: '/',
    siteName: 'Karate Bros',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Karate Bros - Official Online Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karate Bros - Play Official Karate Bros Game Online',
    description: 'Play Karate Bros online! The official Karate Bros game unblocked.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification
    // Get your verification code from: https://search.google.com/search-console
    // Add it to .env.local as: GOOGLE_SITE_VERIFICATION=your-verification-code
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bangers.variable} ${pressStart2P.variable}`}>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://karatebros.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://karatebros.io" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Analytics - Full code in head for GSC verification */}
        {/* GA ID: G-ZX2YGFMKBK */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZX2YGFMKBK"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZX2YGFMKBK');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-black text-slate-50 font-sans selection:bg-red-500 selection:text-white`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}

