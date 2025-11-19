import { getServerSession } from 'next-auth';
import { getKorisnikById } from '@actions/korisnici';
import { redirect } from 'next/navigation';


import ProfilClient from './ProfilClient';
import { Korisnik } from '@types';
import { authOptions } from 'packages/auth/dist';
// Removed stray 'i'

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/prijava');
  }

  const result = await getKorisnikById(session.user.id);

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">Greška pri učitavanju profila</div>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </div>
    );
  }

  // Ensure korisnik has all required fields for the Korisnik type
  const podaciPreuzimanja = (result.data as any).podaciPreuzimanja || {};

  const korisnik: Korisnik = {
    ...result.data,
    id: String(result.data.id),
    telefon: podaciPreuzimanja.telefon ?? '',
    grad: podaciPreuzimanja.grad ?? '',
    postanskiBroj: podaciPreuzimanja.postanskiBroj ? Number(podaciPreuzimanja.postanskiBroj) : 0,
    adresa: podaciPreuzimanja.adresa ?? '',
  };

  return <ProfilClient korisnik={korisnik} userId={session.user.id} />;
}