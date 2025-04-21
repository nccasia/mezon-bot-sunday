-- CreateTable
CREATE TABLE "salary" (
    "id" SERIAL NOT NULL,
    "applyMonth" TIMESTAMP(3) NOT NULL,
    "dateE" TIMESTAMP(3) NOT NULL,
    "dateA" TIMESTAMP(3),

    CONSTRAINT "salary_pkey" PRIMARY KEY ("id")
);
