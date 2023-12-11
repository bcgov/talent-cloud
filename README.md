# talent-cloud

## Developer Set Up

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

Local Dev Containers:

- Nginx Reverse Proxy: http://localhost:3050
- Frontend/React: http://localhost:3050
- Backend/NestJS: http://localhost:3050/api
- Keycloak: http://localhost:8080
- Postgres: http://localhost:5432

### Keycloak - Local

A default realm and client have been set up.

To login:

- username: "local-user"
- password: "password"
