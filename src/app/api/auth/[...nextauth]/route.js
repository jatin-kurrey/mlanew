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
        const user = { id: "1", name: "Admin", email: "admin@example.com", role: "admin" };

        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "admin"
        ) {
          console.log("Authorize success for:", user.email);
          return user;
        }
        console.log("Authorize failed for:", credentials?.email);
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Add user data to token on sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      // Add token data to session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Use environment variable for secret, fallback to hardcoded for development
  secret: process.env.NEXTAUTH_SECRET,

  // Add debug mode in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
