-- CreateTable
CREATE TABLE "PartnerVisitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "partner" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerVisitor_email_key" ON "PartnerVisitor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerVisitor_phone_key" ON "PartnerVisitor"("phone");
