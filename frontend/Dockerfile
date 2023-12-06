###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20.10.0-alpine AS dev

WORKDIR /app

ENV PORT 3000

COPY *.json .

RUN npm ci

COPY . .

EXPOSE 3000

###################
# BUILD FOR PRODUCTION
###################
FROM node:20.10.0-alpine AS build

ENV NODE_ENV production

WORKDIR /app

COPY *.json .

COPY server.js .
# neeeded to run build gives access to nest pkg
COPY --from=dev /app/node_modules ./node_modules

COPY . .

RUN npm run build

ENV NODE_ENV production

RUN npm pkg delete scripts.prepare

RUN npm ci --only=production && npm cache clean --force

############################
# PRODUCTION
#############################

FROM gcr.io/distroless/nodejs20-debian11:nonroot AS production

COPY --from=build /app/public ./public
COPY --from=build /app/build ./build
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# non-root user
USER app

# Start up command with 50MB of heap size, each application needs to determine what is the best value. DONT use default as it is 4GB.
CMD ["--max-old-space-size=50", "app/dist/server"]