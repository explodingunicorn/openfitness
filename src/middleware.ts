import { NextConfig } from "next";
import { withAuth } from "next-auth/middleware";
import { env } from "./env/server.mjs";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;
      console.log({ pathname });
      if (pathname === "/") {
        return true;
      }
      console.log({ token });
      if (token) return true;
      return false;
    },
  },
  secret: env.NEXTAUTH_SECRET,
});

export const config: NextConfig = { matcher: ["/workouts"] };
