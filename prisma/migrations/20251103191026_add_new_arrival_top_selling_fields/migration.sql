-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isNewArrival" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTopSelling" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "category" SET DEFAULT 'uncategorized';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE INDEX "Product_isNewArrival_idx" ON "Product"("isNewArrival");

-- CreateIndex
CREATE INDEX "Product_isTopSelling_idx" ON "Product"("isTopSelling");
