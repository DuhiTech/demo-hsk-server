-- AlterTable
ALTER TABLE "public"."Exam" ADD COLUMN     "closeAt" TIMESTAMPTZ(6),
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "openAt" TIMESTAMPTZ(6);
