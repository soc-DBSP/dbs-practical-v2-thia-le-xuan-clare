/*
  Warnings:

  - You are about to drop the `preRequisite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "preRequisite";

-- CreateTable
CREATE TABLE "pre_requisite" (
    "mod_code" VARCHAR(10) NOT NULL,
    "requisite" VARCHAR(10) NOT NULL,

    CONSTRAINT "pre_requisite_pkey" PRIMARY KEY ("mod_code","requisite")
);
