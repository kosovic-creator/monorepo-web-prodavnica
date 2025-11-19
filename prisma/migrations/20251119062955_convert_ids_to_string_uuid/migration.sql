/*
  Warnings:

  - The primary key for the `Korisnik` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PodaciPreuzimanja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Porudzbina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Proizvod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StavkaKorpe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StavkaPorudzbine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `omiljeni` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "PodaciPreuzimanja" DROP CONSTRAINT "PodaciPreuzimanja_korisnikId_fkey";

-- DropForeignKey
ALTER TABLE "Porudzbina" DROP CONSTRAINT "Porudzbina_korisnikId_fkey";

-- DropForeignKey
ALTER TABLE "StavkaKorpe" DROP CONSTRAINT "StavkaKorpe_korisnikId_fkey";

-- DropForeignKey
ALTER TABLE "StavkaKorpe" DROP CONSTRAINT "StavkaKorpe_proizvodId_fkey";

-- DropForeignKey
ALTER TABLE "StavkaPorudzbine" DROP CONSTRAINT "StavkaPorudzbine_porudzbinaId_fkey";

-- DropForeignKey
ALTER TABLE "StavkaPorudzbine" DROP CONSTRAINT "StavkaPorudzbine_proizvodId_fkey";

-- DropForeignKey
ALTER TABLE "omiljeni" DROP CONSTRAINT "omiljeni_korisnikId_fkey";

-- DropForeignKey
ALTER TABLE "omiljeni" DROP CONSTRAINT "omiljeni_proizvodId_fkey";

-- AlterTable
ALTER TABLE "Korisnik" DROP CONSTRAINT "Korisnik_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Korisnik_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Korisnik_id_seq";

-- AlterTable
ALTER TABLE "PodaciPreuzimanja" DROP CONSTRAINT "PodaciPreuzimanja_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "korisnikId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PodaciPreuzimanja_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PodaciPreuzimanja_id_seq";

-- AlterTable
ALTER TABLE "Porudzbina" DROP CONSTRAINT "Porudzbina_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "korisnikId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Porudzbina_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Porudzbina_id_seq";

-- AlterTable
ALTER TABLE "Proizvod" DROP CONSTRAINT "Proizvod_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Proizvod_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Proizvod_id_seq";

-- AlterTable
ALTER TABLE "StavkaKorpe" DROP CONSTRAINT "StavkaKorpe_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "korisnikId" SET DATA TYPE TEXT,
ALTER COLUMN "proizvodId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StavkaKorpe_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StavkaKorpe_id_seq";

-- AlterTable
ALTER TABLE "StavkaPorudzbine" DROP CONSTRAINT "StavkaPorudzbine_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "porudzbinaId" SET DATA TYPE TEXT,
ALTER COLUMN "proizvodId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StavkaPorudzbine_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StavkaPorudzbine_id_seq";

-- AlterTable
ALTER TABLE "omiljeni" DROP CONSTRAINT "omiljeni_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "korisnikId" SET DATA TYPE TEXT,
ALTER COLUMN "proizvodId" SET DATA TYPE TEXT,
ADD CONSTRAINT "omiljeni_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "omiljeni_id_seq";

-- AddForeignKey
ALTER TABLE "PodaciPreuzimanja" ADD CONSTRAINT "PodaciPreuzimanja_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StavkaKorpe" ADD CONSTRAINT "StavkaKorpe_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StavkaKorpe" ADD CONSTRAINT "StavkaKorpe_proizvodId_fkey" FOREIGN KEY ("proizvodId") REFERENCES "Proizvod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Porudzbina" ADD CONSTRAINT "Porudzbina_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StavkaPorudzbine" ADD CONSTRAINT "StavkaPorudzbine_porudzbinaId_fkey" FOREIGN KEY ("porudzbinaId") REFERENCES "Porudzbina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StavkaPorudzbine" ADD CONSTRAINT "StavkaPorudzbine_proizvodId_fkey" FOREIGN KEY ("proizvodId") REFERENCES "Proizvod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "omiljeni" ADD CONSTRAINT "omiljeni_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "omiljeni" ADD CONSTRAINT "omiljeni_proizvodId_fkey" FOREIGN KEY ("proizvodId") REFERENCES "Proizvod"("id") ON DELETE CASCADE ON UPDATE CASCADE;
