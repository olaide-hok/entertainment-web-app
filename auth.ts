/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const config = {
    pages: {
        signIn: '/login',
        error: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                try {
                    const res = await fetch(process.env.NEXT_API_LOGIN_ROUTE!, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                        headers: {'Content-Type': 'application/json'},
                    });

                    if (!res.ok) {
                        throw new Error('Invalid credentials');
                    }

                    const response = await res.json();
                    if (res.ok && response) {
                        return response;
                    }

                    return null;
                } catch (error) {
                    console.error('Authorize error:', error);
                    throw new Error('Login failed');
                }
            },
        }),
    ],
    callbacks: {
        async signIn({account}: any) {
            // Allow only credentials login in this setup
            return account.provider === 'credentials';
        },
        async session({session, token}: any) {
            if (token?.user) {
                session.user = token.user;
            }
            if (token?.accessToken) {
                session.accessToken = token.accessToken;
            }
            return session;
        },
        async jwt({token, user}: any) {
            if (user) {
                token.user = user;
                if (user.token) {
                    token.accessToken = user.token; // store API token if present
                }
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // ✅ Required in production
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);
