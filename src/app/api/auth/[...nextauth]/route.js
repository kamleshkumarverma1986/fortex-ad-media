// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";
import User from "@/models/user";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    // Admin Credentials Provider
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;
        const admin = await Admin.findOne({ email });

        if (admin && admin.password === password) {
          return {
            id: admin._id.toString(),
            email: admin.email,
            role: "admin",
          };
        }

        return null;
      },
    }),

    // Google Provider for Normal Users
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Facebook Provider for Normal Users
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // For social login (normal users)
      if (account.provider === "google" || account.provider === "facebook") {
        await connectToDB();

        // Check if user exists, if not create one
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
          });
        }

        user.id = existingUser._id.toString();
        user.role = "user";
        return true;
      }

      // For admin credentials login
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin-login", // Admin sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
