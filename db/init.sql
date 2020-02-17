-- Postgres set up user
su - postgres
psql
CREATE DATABASE rcdb;
CREATE USER dbuser;
ALTER USER dbuser WITH ENCRYPTED PASSWORD 'pa88w0rd';
GRANT ALL PRIVILEGES ON DATABASE rcdb TO dbuser;
ALTER USER dbuser WITH SUPERUSER;
ALTER DATABASE rcdb OWNER TO dbuser;
DROP TABLE IF EXISTS users ;
CREATE TABLE users(
   id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (50) NOT NULL
);
INSERT INTO users (username,password) VALUES ('user','password');
SELECT * FROM USERS;
-- Postgres set up tables
