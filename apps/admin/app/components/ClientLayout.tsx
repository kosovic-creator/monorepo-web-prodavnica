'use client';
import { SessionProvider } from "next-auth/react";
import NavbarAdmin from "./NavbarAdmin";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body>
        <SessionProvider>
        <NavbarAdmin />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
