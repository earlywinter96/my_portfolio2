import './globals.css'

export const metadata = {
  title: 'Hemant Solanki - Senior Data Analyst & AI Developer',
  description: 'Senior Data Analyst & AI Developer with 4.5 years experience specializing in Python, SQL, R, Machine Learning, and Business Intelligence. Building AI-powered solutions that drive impact.',
  keywords: 'Data Analyst, Python, R, SQL, AI, Machine Learning, Gemini API, Business Intelligence, Portfolio, Developer, Hemant Solanki',
  author: 'Hemant Solanki',
  openGraph: {
    title: 'Hemant Solanki - Senior Data Analyst & AI Developer',
    description: 'Senior Data Analyst & AI Developer specializing in Python, SQL, Machine Learning, and Business Intelligence. Building AI-powered solutions that drive impact.',
    url: 'https://my-portfolio2-peach-six.vercel.app/',
    siteName: 'Hemant Solanki Portfolio',
    images: [
      {
        url: '/portfolio-preview.png',
        width: 1200,
        height: 630,
        alt: 'Hemant Solanki - Senior Data Analyst & AI Developer',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemant Solanki - Senior Data Analyst & AI Developer',
    description: 'Senior Data Analyst & AI Developer specializing in Python, SQL, Machine Learning, and Business Intelligence.',
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