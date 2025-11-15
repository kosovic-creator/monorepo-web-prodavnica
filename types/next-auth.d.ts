import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Proširenje tipova za session.user i JWT token

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id?: string;
      uloga?: string;
      ime?: string;
      prezime?: string;
    };
  }
  interface User extends DefaultUser {
    id?: string;
    uloga?: string;
    ime?: string;
    prezime?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    uloga?: string;
    ime?: string;
    prezime?: string;
  }
}
