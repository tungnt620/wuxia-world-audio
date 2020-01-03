-- End current transaction of db-migrate
commit;

begin transaction;
CREATE TABLE IF NOT EXISTS "book" (
	"id"	integer primary key autoincrement,
	"name"	text not null,
	"slug"	text not null unique,
	"desc"	text,
	"img"	text,
	"created_at"	text,
	"updated_at"	text
);
commit;

begin transaction;
CREATE TABLE IF NOT EXISTS  "author" (
	"id"	integer primary key autoincrement,
	"name"	text not null,
	"slug"	text not null unique,
	"desc"	text,
	"img"	text,
	"created_at"	text,
	"updated_at"	text
);
commit;

begin transaction;
CREATE TABLE IF NOT EXISTS "book_author" (
	"book_id"	integer not null,
	"author_id"	integer not null,
	foreign key("book_id") references "book"("id"),
	foreign key("author_id") references "author"("id")
);
commit;

begin transaction;
CREATE TABLE IF NOT EXISTS "chapter" (
    "id" integer primary key autoincrement ,
    "audio" text not null,
    "name" text not null,
    "slug" text not null unique,
    "text" text,
	"created_at"	text,
	"updated_at"	text
);
commit;

begin transaction;
CREATE TABLE IF NOT EXISTS "book_chapter" (
    "book_id" integer not null,
    "chapter_id" integer not null,
    foreign key ("book_id") references "book"("id"),
    foreign key ("chapter_id") references "chapter"("id")
);
commit;

begin transaction;
CREATE TABLE IF NOT EXISTS "cat" (
    "id" integer primary key autoincrement ,
    "name" text not null,
    "slug" text not null unique,
    "desc" text,
    "img" text,
	"created_at"	text,
	"updated_at"	text
);
commit;

begin transaction;
CREATE TABLE IF NOT EXISTS "book_cat" (
    "book_id" integer not null,
    "cat_id" integer not null,
    foreign key ("book_id") references "book"("id"),
    foreign key ("cat_id") references "cat"("id")
);
-- Commit of this transaction will do by db-migrate
