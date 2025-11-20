import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // HARDCODED CREDENTIALS FOR IMMEDIATE ACCESS
        // User requested "basic login"
        const user = { id: "1", name: "Admin", email: "admin@example.com" };

        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "admin"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  secret: "temporary-secret-key-123", // Hardcoded secret to avoid env issues
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
