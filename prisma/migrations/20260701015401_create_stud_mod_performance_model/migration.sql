-- CreateTable
CREATE TABLE "studModPerformance" (
    "adm_no" CHAR(4) NOT NULL,
    "mod_registered" VARCHAR(10) NOT NULL,
    "mark" INTEGER NOT NULL,
    "grade" CHAR(2) NOT NULL,

    CONSTRAINT "studModPerformance_pkey" PRIMARY KEY ("adm_no","mod_registered")
);
