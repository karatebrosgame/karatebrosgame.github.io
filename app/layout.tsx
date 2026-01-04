import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Karate Bros - Play Official Karate Bros Game Online | Unblocked',
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://karatebrosgame.github.io/karatebros'),
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karate Bros - Play Official Karate Bros Game Online',
    description: 'Play Karate Bros online! The official Karate Bros game unblocked.',
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
    // Add your verification codes here if needed
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-black text-slate-50 font-sans selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  )
}

