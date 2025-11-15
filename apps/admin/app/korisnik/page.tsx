import React from "react";
import { getKorisnici } from "@actions/korisnici";
import AdminClient from "./AdminClient";


export default async function KorisniciAdmin() {
    const podaci = await getKorisnici();
    console.log("Korisnici podaci:", podaci);
    if (!podaci.success) {
        return <div>Greška: {podaci.error || "Nepoznata greška"}</div>;
    }
    if (!podaci.data) {
        return <div>Nema podataka o korisnicima.</div>;
    }
    return <AdminClient korisnici={podaci.data.korisnici} />;
}
