"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeModeScript } from 'flowbite-react';
const inter = Inter({ subsets: ['latin'] })

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript mode="light" />
      </head>
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  )
}
