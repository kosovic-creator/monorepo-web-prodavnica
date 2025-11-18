export type Proizvod = {
  id: string;
  // API polja
  naziv: string;
  opis: string;
  kategorija: string;
  karakteristike?: string;
  // Lokalizovana polja
  naziv_sr?: string;
  naziv_en?: string;
  opis_sr?: string;
  opis_en?: string;
  karakteristike_sr?: string;
  karakteristike_en?: string;
  kategorija_sr?: string;
  kategorija_en?: string;
  cena: number;
  kolicina: number;
  slike?: string[];
  kreiran: Date;
  azuriran: Date;
}

// Tip koji odgovara strukturi Server Actions
export type ProizvodServerAction = {
  id: number;
  cena: number;
  slika: string | null;
  kolicina: number;
  kreiran: Date;
  azuriran: Date;
  naziv_sr: string;
  naziv_en: string;
  opis_sr: string | null;
  opis_en: string | null;
  karakteristike_sr: string | null;
  karakteristike_en: string | null;
  kategorija_sr: string;
  kategorija_en: string;
}

export type Korisnik = {
  id: string;
  ime: string;
  prezime: string;
  email: string;
  uloga: string;
  telefon: string;
  grad: string;
  postanskiBroj: number;
  adresa: string;
  kreiran: Date;
  azuriran: Date;
};

export type KorisnikData = {
  email: string;
  lozinka: string;
  kreiran: Date;
  podaciPreuzimanja: {
    id: string;
    korisnikId: string;
    kreiran: Date;
    azuriran: Date;
    adresa: string;
    grad: string;
    drzava: string;
    telefon: string;
    postanskiBroj: number;
  } | null;
};

export type StavkaKorpe = {
  id: number;
  korisnikId: number;
  proizvodId: number;
  kolicina: number;
  kreiran: Date;
  azuriran: Date;
  proizvod?: Proizvod;
};

export type Porudzbina = {
  id: number;
  korisnikId: number;
  ime: string;
  prezime: string;
  ukupno: number;
  status: string;
  email?: string | null;
  kreiran: Date;
  azuriran: Date;
  idPlacanja?: string | null;
  stavkePorudzbine?: StavkaPorudzbine[];
  korisnik: {
    id: number;
    ime: string | null;
    prezime: string | null;
    email: string;
  };
};

export type StavkaPorudzbine = {
  id: number;
  porudzbinaId: number;
  proizvodId: number;
  kolicina: number;
  cena: number;
  slika?: string | null;
  opis?: string | null;
  kreiran: Date;
  azuriran: Date;
  proizvod?: Proizvod;
};

export type Omiljeni = {
  id: number;
  korisnikId: number;
  proizvodId: number;
  kreiran: Date;
  proizvod: {
    id: number;
    cena: number;
    slika?: string | null;
    kolicina: number;
    kreiran: Date;
    azuriran: Date;
    prevodi: Array<{
      id: number;
      proizvodId: number;
      jezik: string;
      naziv: string;
      opis?: string | null;
      karakteristike?: string | null;
      kategorija: string;
    }>;
  };
};

export type ProizvodTranslation = {
  id: number;
  proizvodId: number;
  jezik: string;
  naziv: string;
  opis?: string | null;
  karakteristike?: string | null;
  kategorija: string;
};

export type TranslationData = {
  naziv: string;
  opis: string;
  karakteristike: string;
  kategorija: string;
};

// export interface PodaciPreuzimanja {
//   id: string;
//   korisnikId: string;
//   adresa: string;
//   grad: string;
//   drzava: string;
//   telefon?: string;
// }

