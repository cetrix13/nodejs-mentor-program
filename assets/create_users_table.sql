DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
  id SERIAL PRIMARY KEY,
  login VARCHAR(100),
  password VARCHAR(100),
  age SMALLINT,
  isDeleted BOOLEAN
);

INSERT INTO "users" VALUES(1, 'oleg-pronin', '123', 21, false);
INSERT INTO "users" VALUES(2, 'maxim-smirnov', '1234', 25, false);
INSERT INTO "users" VALUES(3, 'anna-ivanova', '12345', 22, false);
INSERT INTO "users" VALUES(4, 'ivan-troshkin', '123456', 30, false);
