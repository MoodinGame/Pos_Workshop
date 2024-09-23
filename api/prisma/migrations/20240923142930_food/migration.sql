-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "foodTypeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "price" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "foodType" TEXT NOT NULL DEFAULT 'food',
    "status" TEXT NOT NULL DEFAULT 'use',

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_foodTypeId_fkey" FOREIGN KEY ("foodTypeId") REFERENCES "FoodType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
