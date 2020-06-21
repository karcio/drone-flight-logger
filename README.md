[![Build Status](https://travis-ci.org/karcio/drone-flight-logger.svg?branch=master)](https://travis-ci.org/karcio/drone-flight-logger)

# Drone flight logger version: 0.6.1

* * *

1.  Clone repository

```
    git clone git@github.com:karcio/drone-flight-logger.git
```
2.  Create database

```
    DROP DATABASE IF EXISTS rcdatadb;
    CREATE DATABASE rcdatadb;
    \c rcdatadb
```
3.  Create user and user table

```
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
```
4.  Create tables

```
    DROP TABLE IF EXISTS drones;
    CREATE TABLE drones (
        id serial PRIMARY KEY,
        drone_id varchar(10) UNIQUE NOT NULL,
        drone_name varchar(15) NOT NULL,
        fc varchar(20) NOT NULL,
        esc varchar(30) NOT NULL,
        camera varchar(15) NOT NULL
    );

    DROP TABLE IF EXISTS flight_log;
    CREATE TABLE flight_log (
        id serial PRIMARY KEY,
        date date NOT NULL,
        place varchar(30) NOT NULL,
        drone_id varchar(15) NOT NULL,
        lipo integer NOT NULL,
        notes text NOT NULL,
        FOREIGN KEY (drone_id) REFERENCES drones (drone_id)
    );
```
3.  Install dependencies and start application

```
    cd drone-flight-logger.git
    npm install
    npm run start
```
4.  Rename .env.template and edit

```
    mv .env.template .env
    vim .env

    DB_USER=dbuser
    DB_PASS=pa88w0rd
    DB_PORT=5432
    DB_NAME=rcdatadb
    APP_PORT=5000
```
4.  Create docker image - TODO

```
    cd git
    docker build -t karcio/dfl:latest -f drone-flight-logger/Dockerfile .
```
