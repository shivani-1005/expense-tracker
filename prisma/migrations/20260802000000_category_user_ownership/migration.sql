-- Categories previously had no owner, so any authenticated user could
-- read/edit/delete any other user's categories. Wiping existing rows
-- (agreed: no real data worth preserving yet) since Category.userId
-- is being made required and there's no owner to backfill it with.
DELETE FROM "Expense";
DELETE FROM "Category";

-- AddColumn
ALTER TABLE "Category" ADD COLUMN "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
