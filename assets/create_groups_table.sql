DROP TABLE IF EXISTS "groups";

CREATE TABLE "groups" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  permissions text[]
);

INSERT INTO "groups" VALUES(1, 'administrators', '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}');
INSERT INTO "groups" VALUES(2, 'users', '{"READ", "WRITE"}');