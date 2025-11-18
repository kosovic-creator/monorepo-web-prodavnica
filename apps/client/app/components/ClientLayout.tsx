'use client';
import { SessionProvider, useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import ClientNavbar from "./ClientNavbar";


function ClentNavbarWithSession() {
  useSession(); // If you need session info for side effects, keep this line; otherwise, you can remove it.
  return <ClientNavbar />;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClentNavbarWithSession />
      {children}
    </SessionProvider>
  );
}
