'use client';
import { Metadata } from 'next';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/connection';
import './globals.scss';

export const metadata: Metadata = {
  title: {
    default: 'NextTask',
    template: '%s | NextTask'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
