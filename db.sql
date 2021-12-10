CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"class" varchar(255) NOT NULL,
	"student" varchar(255) NOT NULL,
	"question" varchar(255) NOT NULL,
	"tags" varchar(255) NOT NULL,
	"answered" BOOLEAN NOT NULL DEFAULT 'false',
	"submitAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"answeredAt" TIMESTAMP,
	"answeredBy" integer,
	"answer" TEXT,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"class" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("answeredBy") REFERENCES "users"("id");
