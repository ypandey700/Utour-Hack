-- CreateTable
CREATE TABLE "public"."AccessLog" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT NOT NULL,
    "accessedId" TEXT NOT NULL,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessorIp" TEXT,

    CONSTRAINT "AccessLog_pkey" PRIMARY KEY ("id")
);
