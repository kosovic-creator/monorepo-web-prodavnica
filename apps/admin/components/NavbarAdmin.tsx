"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarAdmin = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/auth/prijava");
    };

    return (
        <nav style={{ display: "flex", alignItems: "center", gap: 16, padding: 8, borderBottom: "1px solid #eee" }}>
            <span>Admin Navbar</span>
            {status === "authenticated" ? (
                <>
                
                    <span style={{ color: "#0a0" }}>
                        {session.user?.email || session.user?.name}
                    </span>
                    <button onClick={handleLogout}>Odjava</button>
                </>
            ) : (
                    <>
                        <Link href="/auth/prijava">Prijava</Link>
                        <Link href="/auth/registracija">Registracija</Link>
                    </>
            )}
        </nav>
    );
};

export default NavbarAdmin;
