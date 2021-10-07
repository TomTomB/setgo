FROM node:14-alpine

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

RUN apk add --no-cache git
RUN npm i -g pnpm

COPY package*.json ./
COPY decorate-angular-cli.js ./
COPY pnpm-lock.lock ./
COPY tools/ ./tools/
COPY .git/ ./.git/

RUN pnpm --frozen-lockfile

COPY . .

RUN pnpm build:version

RUN pnpm build:sw-config

RUN pnpm build:ssr:client

RUN pnpm build:ssr:server

RUN pnpm build:compress

CMD pnpm serve:ssr
