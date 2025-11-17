'use client';
import { SessionProvider, useSession } from "next-auth/react";
import AdminNavbar from "./AdminNavbar";



import { useEffect } from "react";
import { useRouter } from "next/navigation";


function AdminNavbarWithSession() {
  const { data: session, status } = useSession();
  return <AdminNavbar session={session ?? undefined} status={status} />;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminNavbarWithSession />
      {children}
    </SessionProvider>
  );
}
