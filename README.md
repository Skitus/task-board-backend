# Project "Todo Borad Backend"
 - Node js verstion 16.18.0
- Swagger http://localhost:8080/api

## Frist of all 

.env file:

 - NODE_ENV=
- PORT=
- CLIENT_URL=
- DB_TYPE=
- POSTGRES_DATABASE=
- POSTGRES_USER=
- POSTGRES_PASSWORD=
- POSTGRES_HOST=
- POSTGRES_PORT=
- TYPEORM_SYNC=
- TYPEORM_LOGGING=
- POSTGRES_DATABASE_TEST=

Example of Env:
 - NODE_ENV='development'
- PORT=8080
- CLIENT_URL='http://localhost:3000'
 - DB_TYPE=postgres
- POSTGRES_DATABASE=task-board
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=123
- POSTGRES_HOST=localhost
- POSTGRES_PORT=5432
- TYPEORM_SYNC=true
- TYPEORM_LOGGING=false
 - POSTGRES_DATABASE_TEST='task-board-test'


## Description

This is a backend project created using the Nest.js framework. The project provides an API and includes integration with a PostgreSQL database using TypeORM. It also uses libraries for data validation and API documentation with Swagger.

## Installation and Setup

1. **Install Dependencies:**

   Install all the necessary dependencies for the project:

   ```bash
   yarn install
Database Configuration:

The project uses a PostgreSQL database. Make sure you have PostgreSQL installed and running. Then, configure the database connection in the src/config/database.config.ts file.

Technologies Used:

- Nest.js
- TypeORM
- PostgreSQL
- Swagger (for API documentation)
- Joi (for data validation)

Run Scripts:
- yarn start:dev: Start the application in development mode with automatic reloading.
- yarn start:debug: Start the application in debug mode with additional logs.
- yarn start:prod: Start the application in production mode.

Testing
To run tests, use the following commands:

- yarn test: Run tests.
- yarn test:watch: Run tests in watch mode.
- yarn test:cov: Run tests and generate a code coverage report.
