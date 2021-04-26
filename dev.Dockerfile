FROM zrpaplicacoes/docker-in-node:lts-alpine

COPY . .

RUN npm install

EXPOSE 80
