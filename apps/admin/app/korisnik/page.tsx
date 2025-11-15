import React from "react";
import { getKorisnici } from "@actions/korisnici";
import AdminClient from "./AdminClient";


export default async function Home() {
    const podaci = await getKorisnici();

    return (
        <AdminClient korisnici={podaci.data.korisnici} />
    );
}
