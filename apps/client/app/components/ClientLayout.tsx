'use client';
import { SessionProvider, useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import ClientNavbar from "./ClientNavbar";


function ClentNavbarWithSession() {
  const { data: session, status } = useSession();
  return <ClientNavbar session={session ?? undefined} status={status} />;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClentNavbarWithSession />
      {children}
    </SessionProvider>
  );
}
