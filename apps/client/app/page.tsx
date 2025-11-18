
'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";



export default function Home() {
    const { data: session } = useSession();
    {session ? console.log(session) : null}

    return (
        <>
            <div>Client Home Page</div>
        </>
    );
}
