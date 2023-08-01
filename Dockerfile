FROM node:18.16.1-alpine

WORKDIR /advertisement_Management

COPY package*.json ./

RUN npm i

COPY . .

RUN apk add --update redis

ENV PORT = 7000
ENV SECRETKEY = "dfvrevervr"


EXPOSE 7000


CMD ["npm" , "start"]

