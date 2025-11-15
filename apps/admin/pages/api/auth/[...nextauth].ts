import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
  lozinka: z.string().min(6),
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email i Lozinka",
      credentials: {
        email: { label: "Email", type: "text" },
        lozinka: { label: "Lozinka", type: "password" },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) return null;
        const { email, lozinka } = result.data;
        const korisnik = await prisma.korisnik.findUnique({ where: { email } });
        if (!korisnik || !korisnik.lozinka) return null;
        const valid = await bcrypt.compare(lozinka, korisnik.lozinka);
        if (!valid) return null;
        return {
          id: String(korisnik.id),
          email: korisnik.email,
          uloga: korisnik.uloga,
          ime: korisnik.ime,
          prezime: korisnik.prezime,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id;
        (token as any).uloga = (user as any).uloga;
        (token as any).ime = (user as any).ime;
        (token as any).prezime = (user as any).prezime;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id;
        (session.user as any).uloga = (token as any).uloga;
        (session.user as any).ime = (token as any).ime;
        (session.user as any).prezime = (token as any).prezime;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/auth/prijava",
    error: "/admin/auth/prijava",
  },
});
