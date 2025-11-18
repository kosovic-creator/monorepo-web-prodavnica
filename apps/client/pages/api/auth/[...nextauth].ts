import NextAuth from "next-auth";
import { authOptions } from 'auth/dist/auth/nextauth.config.js';

export default NextAuth(authOptions);
