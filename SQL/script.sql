CREATE TABLE public.points (
	id serial NOT NULL,
	id_user int4 NOT NULL,
	shape geometry NULL,
	title varchar(500) NULL
);
CREATE TABLE public.users (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL
);
