/*
  Warnings:

  - You are about to drop the column `altitude` on the `location_history` table. All the data in the column will be lost.
  - You are about to drop the column `bearing` on the `location_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."location_history" DROP COLUMN "altitude",
DROP COLUMN "bearing";

-- AlterTable
ALTER TABLE "public"."tourists" ADD COLUMN     "photoCid" TEXT;
