-- CreateTable
CREATE TABLE "Lolpro" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,

    CONSTRAINT "Lolpro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProMatches" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "lolproId" TEXT,

    CONSTRAINT "ProMatches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProMatches" ADD CONSTRAINT "ProMatches_lolproId_fkey" FOREIGN KEY ("lolproId") REFERENCES "Lolpro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
