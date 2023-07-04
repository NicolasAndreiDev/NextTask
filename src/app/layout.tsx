import { Metadata } from 'next';
import './globals.scss';
import ProviderGlobal from './providerGlobal';

export const metadata: Metadata = {
  title: {
    default: 'NextTask',
    template: '%s | NextTask'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ProviderGlobal>
          {children}
        </ProviderGlobal>
      </body>
    </html>
  )
}
