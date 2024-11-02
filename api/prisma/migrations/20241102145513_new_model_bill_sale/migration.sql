-- AlterTable
ALTER TABLE "BillSaleDetail" ADD COLUMN     "moneyAdded" INTEGER,
ALTER COLUMN "foodSizeId" DROP NOT NULL,
ALTER COLUMN "tasteId" DROP NOT NULL;
