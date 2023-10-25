import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })
//added the spaceGrotesk font to solve the error in the tailwind config
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300','400','500','600','700']})

export const metadata: Metadata = {
  title: 'Pricepal',
  description: 'Save time and save money with pricepal keeping track of your product wishlist.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return ( //added a nav bar component
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10x1 mx-auto">
          <Navbar />
        {children}
        </main>
        </body>
    </html>
  )
}
