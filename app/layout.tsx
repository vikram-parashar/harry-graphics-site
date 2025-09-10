import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { Baloo_2 } from 'next/font/google'
import '@/style/globals.css'

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-baloo2',
})

export const metadata: Metadata = {
  title: 'Harry Graphics',
  description:
    'Customized ID Card Solutions, Lanyard Printing, Merchandise, Awards, and More',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${baloo2.variable} antialiased max-w-screen overflow-x-hidden`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
