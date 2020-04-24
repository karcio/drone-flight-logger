#!/bin/bash

psql -U postgres -d rcdatadb -c "INSERT INTO 'users' (username,password) VALUES ('user1','password');"
psql -U postgres -d rcdatadb -c "SELECT * FROM users;"