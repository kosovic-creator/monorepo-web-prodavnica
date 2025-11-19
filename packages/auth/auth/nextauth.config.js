"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const google_1 = __importDefault(require("next-auth/providers/google"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const bcrypt = __importStar(require("bcryptjs"));
const zod_1 = require("zod");
const _prisma_client_1 = require("@prisma-client");
const loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    lozinka: zod_1.z.string().min(6),
});
exports.authOptions = {
    providers: [
        (0, google_1.default)({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        (0, credentials_1.default)({
            name: "Email i Lozinka",
            credentials: {
                email: { label: "Email", type: "text" },
                lozinka: { label: "Lozinka", type: "password" },
            },
            async authorize(credentials) {
                const result = loginSchema.safeParse(credentials);
                if (!result.success)
                    return null;
                const { email, lozinka } = result.data;
                const korisnik = await _prisma_client_1.prisma.korisnik.findUnique({
                    where: { email },
                });
                if (!korisnik || !korisnik.lozinka)
                    return null;
                const valid = await bcrypt.compare(lozinka, korisnik.lozinka);
                if (!valid)
                    return null;
                return {
                    id: String(korisnik.id),
                    email: korisnik.email,
                    uloga: korisnik.uloga,
                    ime: korisnik.ime,
                    prezime: korisnik.prezime,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            // Za OAuth provider-e (Google)
            if ((account === null || account === void 0 ? void 0 : account.provider) === "google") {
                try {
                    // Proveravamo da li korisnik već postoji u bazi
                    const postojeciKorisnik = await _prisma_client_1.prisma.korisnik.findUnique({
                        where: { email: user.email },
                    });
                    // Ako ne postoji, kreiramo novog korisnika sa minimalnim podacima
                    if (!postojeciKorisnik) {
                        await _prisma_client_1.prisma.korisnik.create({
                            data: {
                                email: user.email,
                                ime: user.name || "",
                                prezime: "", // default value
                                uloga: "korisnik",
                                lozinka: "", // OAuth users may not have a password
                            },
                        });
                    }
                    else {
                        // Ažuriramo postojećeg korisnika sa novim podacima
                        await _prisma_client_1.prisma.korisnik.update({
                            where: { email: user.email },
                            data: {
                                ime: user.name || postojeciKorisnik.ime,
                            },
                        });
                    }
                }
                catch (error) {
                    console.error("Greška pri čuvanju OAuth korisnika:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                // Za credentials provider
                if ((account === null || account === void 0 ? void 0 : account.provider) === "credentials") {
                    const u = user;
                    token.id = u.id;
                    token.uloga = u.uloga;
                    token.ime = u.ime;
                    token.prezime = u.prezime;
                    // ...existing code...
                }
                else {
                    // Za OAuth provider-e, dobijamo podatke iz baze
                    const korisnikIzBaze = await _prisma_client_1.prisma.korisnik.findUnique({
                        where: { email: user.email },
                    });
                    if (korisnikIzBaze) {
                        token.id = String(korisnikIzBaze.id);
                        token.uloga = korisnikIzBaze.uloga;
                        token.ime = korisnikIzBaze.ime || undefined;
                        token.prezime = korisnikIzBaze.prezime || undefined;
                    }
                }
            }
            return token;
        },
        async session({ session, token }) {
            // Dodajemo polje uloga iz tokena u session.user
            if (token && session.user) {
                session.user.uloga = token.uloga;
                session.user.ime = token.ime;
                session.user.prezime = token.prezime;
                // ...existing code...
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/prijava",
        error: "/auth/prijava",
    },
};
