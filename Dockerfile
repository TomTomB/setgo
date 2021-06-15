FROM node:14-alpine

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install

RUN npm run build:version

COPY . .

RUN npm run build:ssr

CMD npm run serve:ssr
