-- Postgres set up user
su - postgres
psql -p 5432

DROP DATABASE IF EXISTS rcdatadb;
CREATE DATABASE rcdatadb;
\c rcdatadb
CREATE USER dbuser;
ALTER USER dbuser WITH ENCRYPTED PASSWORD 'pa88w0rd';
GRANT ALL PRIVILEGES ON DATABASE rcdatadb TO dbuser;
ALTER USER dbuser WITH SUPERUSER;
ALTER DATABASE rcdatadb OWNER TO dbuser;
DROP TABLE IF EXISTS users;
CREATE TABLE users(
   id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (50) NOT NULL
);
INSERT INTO users (username,password) VALUES ('dbuser','pa88w0rd');
SELECT * FROM USERS;
-- Postgres set up tables
DROP TABLE IF EXISTS drones;
CREATE TABLE drones (
    id serial PRIMARY KEY,
    drone_id varchar(10) UNIQUE NOT NULL,
    drone_name varchar(15) NOT NULL,
    fc varchar(20) NOT NULL,
    esc varchar(30) NOT NULL,
    camera varchar(15) NOT NULL
);
--INSERT INTO drones (drone_id, drone_name, fc, esc, camera) VALUES ('mavic','mavic pro','stock','stock','stock','stock');
DROP TABLE IF EXISTS flight_log;
CREATE TABLE flight_log (
    id serial PRIMARY KEY,
    date date NOT NULL,
    place varchar(30) NOT NULL,
    drone_id varchar(15) NOT NULL,
    lipo integer NOT NULL,
    notes text NULL,
    FOREIGN KEY (drone_id) REFERENCES drones (drone_id)
);
--INSERT INTO flight_log (date, place, drone_id, lipo, notes) VALUES (current_date,'home','mavic',1,'all good');
