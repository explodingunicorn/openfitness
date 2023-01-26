import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

import { env } from "../../../env/server.mjs";
import { sendVerificationRequest } from "../../../utils/email";
import { supabase } from "../../../utils/supabaseClient";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async signIn(params) {
      const res = await supabase
        .from("users")
        .select()
        .eq("email", params.user.email || "");
      // If we already have an existing user in supabase
      if (res.data?.length) {
        return true;
      } else {
        // Otherwise we want to create a new user in supabase
        if (params.user.email) {
          const { error } = await supabase
            .from("users")
            .insert({
              next_auth_user_id: params.user.id,
              email: params.user.email || "",
            });
          if (error) {
            console.error(error.message);
            return false;
          }
          return true;
        } else {
          return false;
        }
      }
    },
    session({ session, user, token }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      sendVerificationRequest,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: SupabaseAdapter({
    url: env.SUPABASE_URL,
    secret: env.SUPABASE_ANON_KEY,
  }),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
