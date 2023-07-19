'use client'
import { client } from '@/connection'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { UserProvider } from '@/providers/UserProvider'
import { ParticipateProjectsProvider } from '@/providers/ParticipateProjectsProvider'

export default function ProviderGlobal({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ApolloProvider client={client}>
                <UserProvider>
                    <ParticipateProjectsProvider>
                        {children}
                    </ParticipateProjectsProvider>
                </UserProvider>
            </ApolloProvider>
        </SessionProvider>
    )
}