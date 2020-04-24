[![Build Status](https://travis-ci.org/karcio/drone-flight-logger.svg?branch=development)](https://travis-ci.org/karcio/drone-flight-logger)
# drone-flight-logger version: 0.1
***

1.  Clone repository

```
git clone git@github.com:karcio/drone-flight-logger.git
```
2.  Create database and user in postgres

```
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
```

3.  Install dependencies and start application

```
cd drone-flight-logger.git
npm install
npm run start
```
4. Rename .env.template and edit

```
mv .env.template .env
vim .env
```
```
DB_USER=user1
DB_PASS=password
DB_PORT=5432
DB_NAME=rcdatadb
APP_PORT=5000
```

4. Create docker image (in progress)

```
cd git
docker build -t karcio/dfl:latest -f drone-flight-logger/Dockerfile .
```
