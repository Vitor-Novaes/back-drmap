FROM zrpaplicacoes/docker-in-node:lts-alpine

COPY ./src ./src
COPY ./config ./config
COPY ./index.js ./index.js
COPY ./package.json ./package.json
COPY ./.sequelizerc ./.sequelizerc

RUN apk update && apk upgrade
RUN npm install --production

EXPOSE 80
CMD [ "npm", "run", "start" ]
