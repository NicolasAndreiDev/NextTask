import NextAuth, { User, Account, Profile } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider, { CredentialInput } from "next-auth/providers/credentials";
import { USER_LOGIN } from "@/graphql/user/UserLogin";
import { client } from "@/connection";
import { CREATE_USER_NEXT } from "@/graphql/user/CreateUserNext";
import { GET_USER_BY_EMAIL_EXIST } from "@/graphql/user/GetUserByEmailExist";
import { AdapterUser } from "next-auth/adapters";

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
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,

        }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn(params: {
            user: User | AdapterUser;
            account: Account | null;
            profile?: Profile;
            email?: { verificationRequest?: boolean };
            credentials?: Record<string, CredentialInput>
            }) {
            
                if (params && params.profile?.email) {
                const { data } = await client.query({
                    query: GET_USER_BY_EMAIL_EXIST,
                    variables: { 
                        email: params.profile.email
                    }
                })

                if(data && data.getUserByEmail === null) {
                    await client.mutate({
                        mutation: CREATE_USER_NEXT,
                        variables: {
                            user: {
                                email: params.profile.email,
                                username: params.profile.name || params.profile.email
                            }
                        }
                    })
                }
            }
            return true;
        }
    },
    pages: {
        signIn: '/login'
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }