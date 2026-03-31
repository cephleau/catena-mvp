import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Catena Language Solutions - Medical Interpretation',
  description: 'Real-time Spanish medical interpreter booking platform. Connect with certified interpreters for healthcare appointments.',
  keywords: ['medical interpretation', 'Spanish', 'interpreter', 'healthcare'],
  openGraph: {
    title: 'Catena Language Solutions',
    description: 'Medical interpretation platform for Spanish-speaking patients and healthcare providers',
    url: 'https://catenalanguagepartners.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
