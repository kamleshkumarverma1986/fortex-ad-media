import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
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
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin-login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
