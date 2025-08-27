/*
  Warnings:

  - The `geoFenceId` column on the `alerts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `blockchain_transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `geo_fences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `geo_fences` table. All the data in the column will be lost.
  - The `id` column on the `geo_fences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `riskLevel` column on the `tourists` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Police` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `emergency_contacts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `emergency_contacts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[aadhaarNumber]` on the table `tourists` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `sections` on the `e_fir` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `type` to the `geo_fences` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED');

-- DropForeignKey
ALTER TABLE "public"."alerts" DROP CONSTRAINT "alerts_geoFenceId_fkey";

-- AlterTable
ALTER TABLE "public"."alerts" DROP COLUMN "geoFenceId",
ADD COLUMN     "geoFenceId" INTEGER;

-- AlterTable
ALTER TABLE "public"."blockchain_transactions" DROP COLUMN "status",
ADD COLUMN     "status" "public"."TransactionStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."e_fir" DROP COLUMN "sections",
ADD COLUMN     "sections" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."geo_fences" DROP CONSTRAINT "geo_fences_pkey",
DROP COLUMN "description",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "riskLevel" DROP DEFAULT,
ALTER COLUMN "coordinates" DROP NOT NULL,
ADD CONSTRAINT "geo_fences_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."tourists" DROP COLUMN "riskLevel",
ADD COLUMN     "riskLevel" "public"."ZoneRiskLevel" NOT NULL DEFAULT 'SAFE',
ALTER COLUMN "isSafe" SET DEFAULT true,
ALTER COLUMN "trackingEnabled" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DEFAULT 'TOURIST';

-- DropTable
DROP TABLE "public"."Police";

-- CreateTable
CREATE TABLE "public"."police" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "police_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "police_department_key" ON "public"."police"("department");

-- CreateIndex
CREATE INDEX "alerts_geoFenceId_idx" ON "public"."alerts"("geoFenceId");

-- CreateIndex
CREATE INDEX "blockchain_transactions_transactionHash_idx" ON "public"."blockchain_transactions"("transactionHash");

-- CreateIndex
CREATE INDEX "e_fir_incidentId_idx" ON "public"."e_fir"("incidentId");

-- CreateIndex
CREATE INDEX "e_fir_filedBy_idx" ON "public"."e_fir"("filedBy");

-- CreateIndex
CREATE INDEX "e_fir_approvedBy_idx" ON "public"."e_fir"("approvedBy");

-- CreateIndex
CREATE UNIQUE INDEX "emergency_contacts_phone_key" ON "public"."emergency_contacts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "emergency_contacts_email_key" ON "public"."emergency_contacts"("email");

-- CreateIndex
CREATE INDEX "emergency_contacts_touristId_idx" ON "public"."emergency_contacts"("touristId");

-- CreateIndex
CREATE INDEX "emergency_contacts_userId_idx" ON "public"."emergency_contacts"("userId");

-- CreateIndex
CREATE INDEX "geo_fences_type_idx" ON "public"."geo_fences"("type");

-- CreateIndex
CREATE INDEX "geo_fences_isActive_idx" ON "public"."geo_fences"("isActive");

-- CreateIndex
CREATE INDEX "incident_updates_incidentId_idx" ON "public"."incident_updates"("incidentId");

-- CreateIndex
CREATE INDEX "incidents_touristId_idx" ON "public"."incidents"("touristId");

-- CreateIndex
CREATE INDEX "incidents_incidentId_idx" ON "public"."incidents"("incidentId");

-- CreateIndex
CREATE INDEX "itineraries_touristId_plannedDate_idx" ON "public"."itineraries"("touristId", "plannedDate");

-- CreateIndex
CREATE UNIQUE INDEX "tourists_aadhaarNumber_key" ON "public"."tourists"("aadhaarNumber");

-- CreateIndex
CREATE INDEX "tourists_userId_idx" ON "public"."tourists"("userId");

-- CreateIndex
CREATE INDEX "tourists_digitalId_idx" ON "public"."tourists"("digitalId");

-- AddForeignKey
ALTER TABLE "public"."alerts" ADD CONSTRAINT "alerts_geoFenceId_fkey" FOREIGN KEY ("geoFenceId") REFERENCES "public"."geo_fences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blockchain_transactions" ADD CONSTRAINT "blockchain_transactions_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."tourists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
