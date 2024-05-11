-- This is an empty migration.

-- migrations/20230511123456_create_user_info_view/migration.sql

-- CreateView
CREATE VIEW "UserInfo" AS
    SELECT u.id, email, name, bio
    FROM "User" u
    LEFT JOIN "Profile" p ON u.id = p."userId";
