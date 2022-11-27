-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(64),
    Email VARCHAR(64),
    BirthDate date
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
	

-- Table: public.articles

-- DROP TABLE IF EXISTS public.articles;

CREATE TABLE articles (
Id SERIAL PRIMARY KEY,
AuthorID integer REFERENCES users (Id),
Name VARCHAR(30),
Content VARCHAR(30)
);

ALTER TABLE IF EXISTS public.articles
    OWNER to postgres;