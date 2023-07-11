'use client'
import { client } from '@/connection'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { UserProvider } from '@/providers/UserProvider'

export default function ProviderGlobal({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ApolloProvider client={client}>
                <UserProvider>
                    {children}
                </UserProvider>
            </ApolloProvider>
        </SessionProvider>
    )
}