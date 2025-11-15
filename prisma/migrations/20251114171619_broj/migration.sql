/*
  Warnings:

  - The primary key for the `Korisnik` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Korisnik` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PodaciPreuzimanja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PodaciPreuzimanja` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Porudzbina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Porudzbina` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Proizvod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Proizvod` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StavkaKorpe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `StavkaKorpe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StavkaPorudzbine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `StavkaPorudzbine` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `omiljeni` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `omiljeni` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `korisnikId` on the `PodaciPreuzimanja` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `korisnikId` on the `Porudzbina` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `korisnikId` on the `StavkaKorpe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `proizvodId` on the `StavkaKorpe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `porudzbinaId` on the `StavkaPorudzbine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `proizvodId` on the `StavkaPorudzbine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `korisnikId` on the `omiljeni` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `proizvodId` on the `omiljeni` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Korisnik_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PodaciPreuzimanja" DROP CONSTRAINT "PodaciPreuzimanja_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "korisnikId",
ADD COLUMN     "korisnikId" INTEGER NOT NULL,
ADD CONSTRAINT "PodaciPreuzimanja_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Porudzbina" DROP CONSTRAINT "Porudzbina_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "korisnikId",
ADD COLUMN     "korisnikId" INTEGER NOT NULL,
ADD CONSTRAINT "Porudzbina_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Proizvod" DROP CONSTRAINT "Proizvod_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Proizvod_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StavkaKorpe" DROP CONSTRAINT "StavkaKorpe_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "korisnikId",
ADD COLUMN     "korisnikId" INTEGER NOT NULL,
DROP COLUMN "proizvodId",
ADD COLUMN     "proizvodId" INTEGER NOT NULL,
ADD CONSTRAINT "StavkaKorpe_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StavkaPorudzbine" DROP CONSTRAINT "StavkaPorudzbine_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "porudzbinaId",
ADD COLUMN     "porudzbinaId" INTEGER NOT NULL,
DROP COLUMN "proizvodId",
ADD COLUMN     "proizvodId" INTEGER NOT NULL,
ADD CONSTRAINT "StavkaPorudzbine_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "omiljeni" DROP CONSTRAINT "omiljeni_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "korisnikId",
ADD COLUMN     "korisnikId" INTEGER NOT NULL,
DROP COLUMN "proizvodId",
ADD COLUMN     "proizvodId" INTEGER NOT NULL,
ADD CONSTRAINT "omiljeni_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PodaciPreuzimanja_korisnikId_key" ON "PodaciPreuzimanja"("korisnikId");

-- CreateIndex
CREATE INDEX "Porudzbina_korisnikId_idx" ON "Porudzbina"("korisnikId");

-- CreateIndex
CREATE INDEX "StavkaKorpe_korisnikId_idx" ON "StavkaKorpe"("korisnikId");

-- CreateIndex
CREATE UNIQUE INDEX "StavkaKorpe_korisnikId_proizvodId_key" ON "StavkaKorpe"("korisnikId", "proizvodId");

-- CreateIndex
CREATE INDEX "StavkaPorudzbine_porudzbinaId_idx" ON "StavkaPorudzbine"("porudzbinaId");

-- CreateIndex
CREATE INDEX "omiljeni_korisnikId_idx" ON "omiljeni"("korisnikId");

-- CreateIndex
CREATE UNIQUE INDEX "omiljeni_korisnikId_proizvodId_key" ON "omiljeni"("korisnikId", "proizvodId");

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
