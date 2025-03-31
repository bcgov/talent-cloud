# TC - Developer Set Up

### Dependencies:

- npm v10.2.4
- node v20.10.0
- docker
- docker-compose
- nest-cli

### Local Development

This project runs three containers for local development.

In order to avoid cors errors during development we are running a reverse proxy
on an nginx server.

Running The Project:

- ensure your node and npm version match those listed in the dependencies
- If it's the first time running the application: `cp .env.example .env`
- `cd frontend && npm i`
- `cd backend && npm i`
- `make build-local`

Setting Up The Database:

- `make migration-run` to set up the DB
- `make seed-local` to provide the initial data for local development
- `make seed-local-personnel` to add test data into the `personnel` table
- `make seed-local-recommitment` to add test data to `recommitment-cycle` (optional)

Useful DB Queries:
- To add yourself as a Supervisor: `update personnel set supervisor_email = '<YOUR_EMAIL>@gov.bc.ca' where id = (select personnel_id from bcws_personnel bp where bp.status = 'ACTIVE' limit 1)`
- To add yourself as Member: `update personnel set email = '<YOUR_EMAIL>@gov.bc.ca' where id = (select personnel_id from bcws_personnel bp where bp.status = 'ACTIVE' limit 1)`
- To access the intake form again after submission, delete all the entries with your email in `intake_form` table and run: `UPDATE "personnel" SET email = 'test@yopmail.com' WHERE email = '<YOUR_EMAIL>@gov.bc.ca';`

Local Dev Containers:

- Nginx Reverse Proxy: http://localhost:3050
- Frontend/React: http://localhost:3050
- Backend/NestJS: http://localhost:3050/api
- Keycloak: http://localhost:8080
- Postgres: http://localhost:5432

### Keycloak - Local

A default realm and client have been set up.

To login to the master realm:

- username: "admin"
- password: "password"

To login to the local client:

- username: "local-user"
- password: "admin"

### Jupyter Notebook

In order to import existing TEAMS members, we have written scripts to translate data from the Master Excel spreadsheet currently in use as of March, 2024 to manage TEAMS rosters and deployments into our system. Our script pulls each relevant row from the spreadsheet and creates INSERT SQL statements to be ran into a database.

To use and install TSLab, follow the instructions [here](https://github.com/yunabe/tslab). The Jupyter Notebook can be opened under the `notebooks` directory. This will require an xlsx file named `teamsmembers.xlsx` in the `notebooks` directory.

### Migrations

In order to run migrations locally, run `make migration-run`, followed by `make seed-data`