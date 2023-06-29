import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!
        })
    ],
    pages: {
        signIn: '/login'
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }