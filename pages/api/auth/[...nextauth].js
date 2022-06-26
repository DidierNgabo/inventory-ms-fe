import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "custom",
      credentials: {
        email: { label: "email", type: "text", placeholder: "youremail@gmail" },
        password: { label: "password", type: "text" },
      },

      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await axios.post(
          "http://localhost:4000/auth/login",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
            },
          }
        );

        const user = res.data;
        if (res && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: "supersecret",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
});
