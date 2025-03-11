-- CreateTable
CREATE TABLE "diagnostic_tests" (
    "id" SERIAL NOT NULL,
    "patient_name" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diagnostic_tests_pkey" PRIMARY KEY ("id")
);

