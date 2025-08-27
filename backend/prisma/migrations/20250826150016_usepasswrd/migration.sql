-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('TOURIST', 'POLICE');

-- CreateEnum
CREATE TYPE "public"."TouristStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EMERGENCY', 'MISSING', 'SAFE', 'DEPARTED');

-- CreateEnum
CREATE TYPE "public"."IncidentType" AS ENUM ('MISSING_PERSON', 'ACCIDENT', 'PANIC_BUTTON', 'ANOMALY_DETECTED', 'SAFETY_VIOLATION', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."IncidentStatus" AS ENUM ('REPORTED', 'ACKNOWLEDGED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'FALSE_ALARM');

-- CreateEnum
CREATE TYPE "public"."AlertSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."ZoneRiskLevel" AS ENUM ('SAFE', 'MODERATE', 'HIGH', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('GEO_FENCE_ALERT', 'SAFETY_SCORE_UPDATE', 'EMERGENCY_ALERT', 'SYSTEM_NOTIFICATION', 'INCIDENT_UPDATE');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" "public"."UserRole",
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Police" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Police_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tourists" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "digitalId" TEXT NOT NULL,
    "blockchainHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "aadhaarNumber" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "gender" TEXT NOT NULL,
    "profileImage" TEXT,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "expectedExitDate" TIMESTAMP(3),
    "actualExitDate" TIMESTAMP(3),
    "entryPoint" TEXT NOT NULL,
    "status" "public"."TouristStatus" NOT NULL DEFAULT 'ACTIVE',
    "safetyScore" INTEGER NOT NULL DEFAULT 100,
    "riskLevel" TEXT NOT NULL DEFAULT 'LOW',
    "lastKnownLat" DOUBLE PRECISION,
    "lastKnownLng" DOUBLE PRECISION,
    "lastLocationUpdate" TIMESTAMP(3),
    "isSafe" BOOLEAN NOT NULL DEFAULT false,
    "trackingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "shareLocation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tourists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."itineraries" (
    "id" TEXT NOT NULL,
    "touristId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "plannedDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "notes" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."emergency_contacts" (
    "id" TEXT NOT NULL,
    "touristId" TEXT,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "relationship" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergency_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."geo_fences" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "riskLevel" "public"."ZoneRiskLevel" NOT NULL DEFAULT 'SAFE',
    "coordinates" JSONB NOT NULL,
    "radius" DOUBLE PRECISION,
    "centerLat" DOUBLE PRECISION,
    "centerLng" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "geo_fences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."location_history" (
    "id" TEXT NOT NULL,
    "touristId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL DEFAULT 'GPS',
    "speed" DOUBLE PRECISION,
    "bearing" DOUBLE PRECISION,
    "altitude" DOUBLE PRECISION,

    CONSTRAINT "location_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."incidents" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "touristId" TEXT NOT NULL,
    "type" "public"."IncidentType" NOT NULL,
    "status" "public"."IncidentStatus" NOT NULL DEFAULT 'REPORTED',
    "severity" "public"."AlertSeverity" NOT NULL DEFAULT 'MEDIUM',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "location" TEXT,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledgedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."incident_updates" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "update" TEXT NOT NULL,
    "newStatus" "public"."IncidentStatus",
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attachments" JSONB,

    CONSTRAINT "incident_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."e_fir" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "firNumber" TEXT NOT NULL,
    "stationCode" TEXT NOT NULL,
    "complainant" TEXT NOT NULL,
    "accused" TEXT,
    "sections" TEXT[],
    "summary" TEXT NOT NULL,
    "filedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filedBy" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "e_fir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."alerts" (
    "id" TEXT NOT NULL,
    "touristId" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "severity" "public"."AlertSeverity" NOT NULL DEFAULT 'MEDIUM',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "geoFenceId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "touristId" TEXT,
    "type" "public"."NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,
    "deliveredAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tourist_analytics" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalTourists" INTEGER NOT NULL DEFAULT 0,
    "activeTourists" INTEGER NOT NULL DEFAULT 0,
    "newArrivals" INTEGER NOT NULL DEFAULT 0,
    "departures" INTEGER NOT NULL DEFAULT 0,
    "emergencyCount" INTEGER NOT NULL DEFAULT 0,
    "averageSafetyScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "topDestinations" JSONB,
    "riskZoneVisits" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tourist_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blockchain_transactions" (
    "id" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "blockHash" TEXT,
    "blockNumber" INTEGER,
    "type" TEXT NOT NULL,
    "touristId" TEXT,
    "data" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "gasUsed" TEXT,
    "gasPrice" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "blockchain_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Police_department_key" ON "public"."Police"("department");

-- CreateIndex
CREATE UNIQUE INDEX "tourists_userId_key" ON "public"."tourists"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tourists_digitalId_key" ON "public"."tourists"("digitalId");

-- CreateIndex
CREATE UNIQUE INDEX "tourists_blockchainHash_key" ON "public"."tourists"("blockchainHash");

-- CreateIndex
CREATE INDEX "location_history_touristId_timestamp_idx" ON "public"."location_history"("touristId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "incidents_incidentId_key" ON "public"."incidents"("incidentId");

-- CreateIndex
CREATE UNIQUE INDEX "e_fir_incidentId_key" ON "public"."e_fir"("incidentId");

-- CreateIndex
CREATE UNIQUE INDEX "e_fir_firNumber_key" ON "public"."e_fir"("firNumber");

-- CreateIndex
CREATE INDEX "alerts_touristId_isRead_idx" ON "public"."alerts"("touristId", "isRead");

-- CreateIndex
CREATE INDEX "notifications_userId_isRead_idx" ON "public"."notifications"("userId", "isRead");

-- CreateIndex
CREATE INDEX "notifications_touristId_isRead_idx" ON "public"."notifications"("touristId", "isRead");

-- CreateIndex
CREATE UNIQUE INDEX "tourist_analytics_date_key" ON "public"."tourist_analytics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "blockchain_transactions_transactionHash_key" ON "public"."blockchain_transactions"("transactionHash");

-- CreateIndex
CREATE INDEX "blockchain_transactions_touristId_idx" ON "public"."blockchain_transactions"("touristId");

-- AddForeignKey
ALTER TABLE "public"."tourists" ADD CONSTRAINT "tourists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itineraries" ADD CONSTRAINT "itineraries_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."tourists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."emergency_contacts" ADD CONSTRAINT "emergency_contacts_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."tourists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."emergency_contacts" ADD CONSTRAINT "emergency_contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location_history" ADD CONSTRAINT "location_history_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."tourists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."incidents" ADD CONSTRAINT "incidents_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."tourists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."incident_updates" ADD CONSTRAINT "incident_updates_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "public"."incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."e_fir" ADD CONSTRAINT "e_fir_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "public"."incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alerts" ADD CONSTRAINT "alerts_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."tourists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alerts" ADD CONSTRAINT "alerts_geoFenceId_fkey" FOREIGN KEY ("geoFenceId") REFERENCES "public"."geo_fences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."tourists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
