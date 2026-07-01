-- CreateTable
CREATE TABLE "preRequisite" (
    "mod_code" VARCHAR(10) NOT NULL,
    "requisite" VARCHAR(10) NOT NULL,

    CONSTRAINT "preRequisite_pkey" PRIMARY KEY ("mod_code","requisite")
);
