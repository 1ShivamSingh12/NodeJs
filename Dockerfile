FROM node:18.16.1-alpine

WORKDIR /advertisement_Management

COPY package*.json ./

RUN apk add --update redis

RUN npm i

COPY . .

ENV SECRETKEY = "dfvrevervr"


EXPOSE 7000


CMD ["npm" , "start"]

