FROM node:14-alpine

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

RUN apk add --no-cache git

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:version

RUN npm run build:ssr:client

RUN npm run build:ssr:server

CMD npm run serve:ssr
