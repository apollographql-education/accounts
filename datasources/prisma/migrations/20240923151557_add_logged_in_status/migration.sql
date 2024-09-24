-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Guest',
    "description" TEXT NOT NULL,
    "lastActiveTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLoggedIn" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("description", "id", "lastActiveTime", "name", "role") SELECT "description", "id", "lastActiveTime", "name", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
