/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exam_userId_title_key" ON "public"."Exam"("userId", "title");
