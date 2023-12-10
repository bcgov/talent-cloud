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
- If it's the first time running the application: ` cp .env.example .env`
- `cd frontend && npm i`
- `cd backend && npm i`
- `make build-local`

Local Dev Containers:

- Nginx Reverse Proxy: http://localhost:3050
- Frontend/React: http://localhost:3050
- Backend/NestJS: http://localhost:3050/api
- Keycloak: http://localhost:8080
- Postgres: http://localhost:5432

#### Keycloak - Local Development

- You will need to create a realm and client the first time that you run this.
- Create with any names you prefer, but be sure to update your local .env file,
  otherwise use the names provided
- Ensure you have copied the variables from .env.example to your .env file
- Go to localhost:8080 in the browser
- First time username: admin
- First time password: password (you can change these and it will perists unless
  you wipe your docker volumes)
- Click "create realm"
  - Name it "local"
- Click "create client"
  - Name it "local-client"
  - Toggle on "always display in the ui" (optional)
- Click next on the capability config screen (use all defaults)
- Login Setting screen:
  - Root URL: "http://localhost:3050/"
  - Home URL: "http://localhost:3050"
  - Valid redirect: "http://localhost:3050/\*"
  - URIs Valid post logout redirect URIs: "http://localhost:3050/\*"
  - Web origins: "http://localhost:3050"
  - Admin URL: "http://localhost:3050"
- Create a user (any info here is fine)
  - Toggle email verified "on"
  - Go to credentials and create a password
  - Toggle off the "temporary" option
- _note:_ Running react in strict mode may cause an additional render and error
  as Keycloak will attempt to be instantiated twice
