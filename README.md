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

In order to avoid cors errors during development we are running a reverse proxy on an nginx server.

To run the project:
- ensure your node and npm version match those listed in the dependencies
- `cd frontend && npm i`
- `cd backend && npm i`
- `make build-local`

You can access the frontend at 'localhost:3050' and the api is at 'localhost:3050/api'


    