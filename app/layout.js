import './globals.css'

export const metadata = {
  title: 'Hemant Solanki - Assistant Manager, AI & Data',
  description: 'Assistant Manager, AI & Data at Reliance Group with 6+ years across Python, SQL, R, analytics automation, AI products, and LipiTranslate.in.',
  keywords: 'AI Data, Data Analyst, Python, R, SQL, Reliance Group, LipiTranslate, Gemini API, Business Intelligence, Portfolio, Hemant Solanki',
  author: 'Hemant Solanki',
  openGraph: {
    title: 'Hemant Solanki - Assistant Manager, AI & Data',
    description: 'AI and data portfolio covering Reliance Group, applied AI projects, analytics automation, and LipiTranslate.in.',
    url: 'https://my-portfolio2-peach-six.vercel.app/',
    siteName: 'Hemant Solanki Portfolio',
    images: [
      {
        url: '/portfolio-preview.png',
        width: 1200,
        height: 630,
        alt: 'Hemant Solanki - Assistant Manager, AI & Data',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemant Solanki - Assistant Manager, AI & Data',
    description: 'AI and data portfolio covering Reliance Group, applied AI projects, analytics automation, and LipiTranslate.in.',
    images: ['/portfolio-preview.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  themeColor: '#0a0e27',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
