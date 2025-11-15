'use client';
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Proširujemo tip session.user da dozvolimo ime, prezime, uloga
interface CustomSessionUser {
  name?: string;
  email?: string;
  image?: string;
  ime?: string;
  prezime?: string;
  uloga?: string;
}

export default function PrijavaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      lozinka,
      redirect: false,
      callbackUrl: "/",
    });
    setLoading(false);
    if (res?.error) {
      setError("Pogrešan email ili lozinka.");
    } else if (res?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-xs mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </label>
        <label>
          Lozinka
          <input
            type="password"
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </label>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Prijava..." : "Prijavi se"}
        </button>
      </form>
    </div>
  );
}

