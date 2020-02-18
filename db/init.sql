-- Postgres set up user
su - postgres
psql -p 5433

DROP DATABASE IF EXISTS rcdatadb;
CREATE DATABASE rcdatadb;
\c rcdatadb
CREATE USER user1;
ALTER USER user1 WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE rcdatadb TO user1;
ALTER USER user1 WITH SUPERUSER;
ALTER DATABASE rcdatadb OWNER TO user1;
DROP TABLE IF EXISTS users;
CREATE TABLE users(
   id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (50) NOT NULL
);
INSERT INTO users (username,password) VALUES ('user1','password');
SELECT * FROM USERS;
-- Postgres set up tables
