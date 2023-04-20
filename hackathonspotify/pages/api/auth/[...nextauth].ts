import NextAuth, { TokenSet } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.CLIENT_ID ?? "",
            clientSecret: process.env.CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: 'user-read-email user-top-read user-library-read'
                }
            }
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
                return {
                    access_token: account.access_token,
                    //@ts-ignore
                    expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
                    refresh_token: account.refresh_token,
                }
            } 
            // @ts-ignore
            else if (Date.now() < token.expires_at * 1000) {
                // If the access token has not expired yet, return it
                return token
            } 
            else {
                try {
                    const response = await fetch("https://accounts.spotify.com/api/token", {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({
                            client_id: process.env.CLIENT_ID ?? "",
                            client_secret: process.env.CLIENT_SECRET ?? "",
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token as string ?? "",
                        }),
                        method: "POST",
                    })

                    const tokens: TokenSet = await response.json();

                    console.log(response);

                    if (!response.ok) throw tokens

                    return {
                        ...token, // Keep the previous token properties
                        access_token: tokens.access_token,
                        // @ts-ignore
                        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        refresh_token: tokens.refresh_token ?? token.refresh_token,
                    }
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    // The error property will be used client-side to handle the refresh token error
                    return { ...token, error: "RefreshAccessTokenError" as const }
                }
            }
        }
    }
})