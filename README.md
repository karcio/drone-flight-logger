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

4. Create docker image

```
docker build -t karcio/dfl:latest -f /home/karcio/git/drone-flight-logger/Dockerfile .
```
