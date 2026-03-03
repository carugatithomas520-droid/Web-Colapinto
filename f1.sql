BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "pilotos" (
	"id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"equipo"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "resultados" (
	"id"	INTEGER,
	"gran_premio"	TEXT NOT NULL,
	"circuito"	TEXT NOT NULL,
	"posicion"	INTEGER NOT NULL,
	"puntos"	INTEGER NOT NULL,
	"temporada"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "pilotos" VALUES (5,'Franco Colapinto','Alpine F1 Team');
COMMIT;
