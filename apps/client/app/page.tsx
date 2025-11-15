import React from "react";
import { getKorisnici } from "@actions/korisnici";
import KorisnikClient from "./KorisnikClient";


export default async function Home() {
    const podaci = await getKorisnici();
    
    return (
        <KorisnikClient korisnici={podaci.data.korisnici} />
    );
}
