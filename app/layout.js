import './globals.css'

export const metadata = {
  title: 'Hemant Solanki - Senior Data Analyst | AI Developer Portfolio',
  description: 'Senior Data Analyst & AI Developer with 4.5 years experience in Python, R, SQL, and AI. Building data-driven solutions with cutting-edge technology.',
  keywords: 'Data Analyst, Python, R, SQL, AI, Machine Learning, Gemini API, Portfolio, Developer',
  author: 'Hemant Solanki',
  openGraph: {
    title: 'Hemant Solanki - Data Analyst & AI Developer',
    description: 'Building intelligent data solutions with Python, R, and AI',
    type: 'website',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}