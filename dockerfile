FROM node:8-alpine

RUN mkdir -p usr/src/app

WORKDIR usr/src/app

COPY . .

RUN npm install

EXPOSE 1234

CMD ["node_modules/.bin/babel-node","index.js"]