import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { USER_LOGIN } from "@/graphql/user/UserLogin";
import { client } from "@/connection";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const { data } = await client.mutate({
                    mutation: USER_LOGIN,
                    variables: {
                        user: {
                            email: credentials?.email,
                            password: credentials?.password,
                        }
                    },
                });
                if (data && data.userLogin) {
                    return data.userLogin;
                } else {
                    return null;
                }
            },
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