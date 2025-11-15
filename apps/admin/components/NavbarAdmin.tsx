"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavbarAdmin = () => {
    const { data: session, status } = useSession();

    return (
        <nav style={{ display: "flex", alignItems: "center", gap: 16, padding: 8, borderBottom: "1px solid #eee" }}>
            <span>Admin Navbar</span>
            <Link href="/auth/prijava">Prijava</Link>
            <Link href="/auth/registracija">Registracija</Link>
            {status === "authenticated" ? (
                <>
                    <span style={{ color: "#0a0" }}>
                        Prijavljen: {session.user?.email || session.user?.name}
                    </span>
                    <button onClick={() => signOut({ callbackUrl: "/auth/prijava" })}>Odjava</button>
                </>
            ) : (
                <button onClick={() => signIn()}>Prijava</button>
            )}
        </nav>
    );
};

export default NavbarAdmin;
