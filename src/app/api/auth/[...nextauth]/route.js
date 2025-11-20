import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        console.log("🔥 DEBUG LOGIN ATTEMPT");
        console.log("Email received:", credentials?.email);
        console.log("Password received:", credentials?.password);

        console.log("Env Email:", process.env.ADMIN_EMAIL);
        console.log("Env Hash:", process.env.ADMIN_PASSWORD_HASH);

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing email or password");
          return null;
        }

        // Compare email
        if (
          credentials.email.trim().toLowerCase() !==
          process.env.ADMIN_EMAIL.trim().toLowerCase()
        ) {
          console.log("❌ Email mismatch");
          return null;
        }

        // Compare password
        const match = await bcrypt.compare(
          credentials.password,
          process.env.ADMIN_PASSWORD_HASH.trim()
        );

        console.log("Password match:", match);

        if (!match) {
          console.log("❌ Password mismatch");
          return null;
        }

        console.log("✅ SUCCESS LOGIN");
        return { id: "admin", email: process.env.ADMIN_EMAIL };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
