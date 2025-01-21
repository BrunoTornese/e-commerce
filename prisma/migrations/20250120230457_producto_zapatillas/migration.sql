-- CreateEnum
CREATE TYPE "ShoeSize" AS ENUM ('EU_36', 'EU_36_5', 'EU_37', 'EU_37_5', 'EU_38', 'EU_38_5', 'EU_39', 'EU_39_5', 'EU_40', 'EU_40_5', 'EU_41', 'EU_41_5', 'EU_42', 'EU_42_5', 'EU_43', 'EU_43_5', 'EU_44', 'EU_44_5', 'EU_45', 'EU_45_5', 'EU_46', 'EU_46_5', 'EU_47', 'EU_47_5', 'N_A');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shoeSize" "ShoeSize"[] DEFAULT ARRAY[]::"ShoeSize"[];
