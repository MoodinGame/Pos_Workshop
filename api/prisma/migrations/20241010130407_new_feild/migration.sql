/*
  Warnings:

  - You are about to drop the column `moneyAdded` on the `SaleTemp` table. All the data in the column will be lost.
  - You are about to drop the column `tasteId` on the `SaleTemp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SaleTemp" DROP COLUMN "moneyAdded",
DROP COLUMN "tasteId";

-- CreateTable
CREATE TABLE "SaleTempDetail" (
    "id" SERIAL NOT NULL,
    "saleTempId" INTEGER NOT NULL,
    "addedMoney" INTEGER,
    "tasteId" INTEGER,
    "foodId" INTEGER NOT NULL,

    CONSTRAINT "SaleTempDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
