import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        await connectToDB();
        const { mobileNumber, otp } = credentials;
        const admin = await Admin.findOne({
          mobileNumber: mobileNumber,
          "otp.value": otp,
        });
        if (admin) {
          return admin;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin-login",
  },
});

export { handler as GET, handler as POST };
