install:
``brew install postgresql

run/exit/show
```brew services start/stop/list postgresql

connect to default database/open prompt
```psql postgres

prompt commands
connection info
```\conninfo
exit
```\q
connect new db
```\c
list databases
```\list
list tables
```\dt
list roles
```\du



links

setup and simple example commands
https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8

sessions, init table
https://www.npmjs.com/package/connect-pg-simple


knex

create new migration
```knex migrate:make create_things

migrate to latest
```knex migrate:latest

create database seed for things
```knex seed:make things

create seeds
```knex seed:run

BUILDING QUERIES
https://devhints.io/knex
