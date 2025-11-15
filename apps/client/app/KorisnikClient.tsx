'use client';
import React from 'react'

interface Korisnik {
    id: number;
    ime: string;
    prezime: string;
    email: string;
}

interface KorisnikClientProps {
    korisnici: Korisnik[];
}

const KorisnikClient: React.FC<KorisnikClientProps> = ({ korisnici }) => {
    const korisniciFixed = korisnici.map((korisnik: any) => ({
        ...korisnik,
        id: Number(korisnik.id),
    }));

    return (
        <div>
            <h1>Dobrodošli u našu prodavnicu!</h1>
            {korisniciFixed.map((k: Korisnik) => (
                <div key={k.id}>
                    <h2>{k.ime} {k.prezime}</h2>
                    <p>Email: {k.email}</p>
                </div>
            ))}
        </div>
    )
}

export default KorisnikClient
