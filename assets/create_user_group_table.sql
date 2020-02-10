DROP TABLE IF EXISTS "user_group";

CREATE TABLE "user_group" (
  id SERIAL PRIMARY KEY,
  user_id SMALLINT,
  group_id SMALLINT
);

INSERT INTO "user_group" VALUES(1, 1, 1);
INSERT INTO "user_group" VALUES(2, 2, 1);
INSERT INTO "user_group" VALUES(3, 3, 2);
INSERT INTO "user_group" VALUES(4, 4, 2);

