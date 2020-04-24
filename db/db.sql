CREATE TABLE users(
   id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (50) NOT NULL
);
INSERT INTO users (username,password) VALUES ('user1','password');
SELECT * FROM users;
ALTER TABLE users OWNER TO user1;
GRANT USAGE ON SCHEMA public TO user1 ;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO user1;