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
            name: admin.email,
            isAdmin: admin.isAdmin,
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

  pages: {
    signIn: "/", // Default sign-in page (will be overridden by redirect callback)
    error: "/", // Default error page (will be overridden by redirect callback)
  },

  callbacks: {
    async signIn({ user, account }) {
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
            isAdmin: false,
          });
        }

        user.id = existingUser._id.toString();
        return true;
      }

      // For admin credentials login
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Handle error redirects
      if (url.includes("/api/auth/error")) {
        const urlObj = new URL(url);
        const error = urlObj.searchParams.get("error");

        // If it's a credentials error (admin login failed)
        if (error === "CredentialsSignin") {
          return `${baseUrl}/login-param?error=invalid-credentials`;
        }

        // For OAuth errors (Callback, OAuthSignin, OAuthCallback, etc.)
        // Redirect to home page without exposing login-param
        return baseUrl; // "/"
      }

      // Handle callback URL from admin login
      if (url.includes("/login-param")) {
        return url;
      }

      // Default redirect behavior
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }

      // Fetch isAdmin from database if not already set (for social logins)
      if (token.email && token.isAdmin === undefined) {
        try {
          await connectToDB();

          // Check if admin first
          const admin = await Admin.findOne({ email: token.email });
          if (admin) {
            token.isAdmin = true;
            token.id = admin._id.toString();
          } else {
            // Check regular user
            const regularUser = await User.findOne({ email: token.email });
            if (regularUser) {
              token.isAdmin = regularUser.isAdmin || false;
              token.id = regularUser._id.toString();
            } else {
              token.isAdmin = false;
            }
          }
        } catch (error) {
          console.error("Error fetching user data in jwt callback:", error);
          token.isAdmin = false;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin || false;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
