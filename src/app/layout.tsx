import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeModeScript } from 'flowbite-react';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OpenWatch',
  description: 'Alberta Open Data Portal',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript /> 
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
