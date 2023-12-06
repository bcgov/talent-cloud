###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20.10.0-alpine AS dev

WORKDIR /app

ENV PORT 3000

COPY *.json ./

RUN npm ci

COPY . .

EXPOSE 3000
###################
# BUILD FOR PRODUCTION
###################

FROM node:20.10.0-bullseye-slim AS build
WORKDIR /app
COPY *.json *.ts index.html ./
COPY ./src ./src
RUN npm ci --ignore-scripts --no-update-notifier --omit=dev && \
    npm run build

###################
# PRODUCTION
###################

FROM node:20.10.0-bullseye-slim AS production

ENV NODE_ENV production

COPY --from=build /app/public ./public
COPY --from=build /app/build ./build
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
