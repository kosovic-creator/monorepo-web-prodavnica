import NextAuth from "next-auth";
import { authOptions } from '../../../../../packages/auth/dist/auth/nextauth.config.js';

export default NextAuth(authOptions);
