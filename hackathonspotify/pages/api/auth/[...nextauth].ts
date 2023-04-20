import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.CLIENT_ID ?? "",
            clientSecret: process.env.CLIENT_SECRET ?? "",
            authorization: { params: {
                scope: 'user-read-email user-top-read user-library-read'
            }}
        }),
    ],

    callbacks: {
        async session({ session, user, token }) {
            // @ts-ignore
            session.accessToken = token.accessToken;
            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/"))
                return `${baseUrl}${url}`

            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl)
                return url
            return baseUrl
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        }
    }
})