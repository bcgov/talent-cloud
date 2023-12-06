###############################
# BUILD FOR LOCAL DEVELOPMENT
##############################

FROM node:20.10.0-alpine AS dev

WORKDIR /usr/src/app

ENV PORT 8080
ENV NODE_ENV local

COPY *.json ./
COPY . .


EXPOSE 8080
############################
# BUILD FOR PROD
#############################

FROM node:20.10.0-bullseye-slim AS build

WORKDIR /usr/src/app

COPY *.json ./
COPY . .

RUN npm ci --ignore-scripts --no-update-notifier --omit=dev && \
    npm run build

############################
# PRODUCTION
#############################

FROM gcr.io/distroless/nodejs20-debian11:nonroot AS production

ENV NODE_ENV production

# Copy over app
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Ports, health check and non-root user
USER app

# Start up command with 50MB of heap size, each application needs to determine what is the best value. DONT use default as it is 4GB.
CMD ["--max-old-space-size=50", "/usr/src/app/dist/main"]