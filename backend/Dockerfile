###############################
# BUILD FOR LOCAL DEVELOPMENT
##############################

FROM node:20.10.0-alpine AS dev

WORKDIR /usr/src/app

ENV PORT 8080
ENV NODE_ENV local

COPY *.json .

RUN npm ci 

COPY . .

EXPOSE 8081
############################
# BUILD FOR PROD
#############################
FROM node:20.10.0-alpine AS build

WORKDIR /usr/src/app

COPY *.json .

# neeeded to run build gives access to nest pkg
COPY --from=dev /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

ENV NODE_ENV production

RUN npm pkg delete scripts.prepare

RUN npm ci --only=production && npm cache clean --force


############################
# PRODUCTION
#############################

FROM gcr.io/distroless/nodejs20-debian11:nonroot AS production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Ports, health check and non-root user
USER app

# Start up command with 50MB of heap size, each application needs to determine what is the best value. DONT use default as it is 4GB.
CMD ["--max-old-space-size=50", "/usr/src/app/dist/main"]