FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN npm install

CMD npm start

RUN npm install -g sequelize-cli

RUN npm install -g nodemon

RUN npm install -g openhim-mediator-utils

EXPOSE 4001

VOLUME [ "/app/node_modules" ]