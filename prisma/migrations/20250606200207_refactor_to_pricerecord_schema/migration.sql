/*
  Warnings:

  - You are about to drop the column `locationId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `ItemPrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `ItemImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_locationId_fkey";

-- DropForeignKey
ALTER TABLE "ItemPrice" DROP CONSTRAINT "ItemPrice_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "locationId";

-- AlterTable
ALTER TABLE "ItemImage" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ItemPrice";

-- CreateTable
CREATE TABLE "PriceRecord" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PriceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PriceRecord_itemId_locationId_date_key" ON "PriceRecord"("itemId", "locationId", "date");

-- AddForeignKey
ALTER TABLE "ItemImage" ADD CONSTRAINT "ItemImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRecord" ADD CONSTRAINT "PriceRecord_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRecord" ADD CONSTRAINT "PriceRecord_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRecord" ADD CONSTRAINT "PriceRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
