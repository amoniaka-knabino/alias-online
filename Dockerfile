FROM node:7.7.2-alpine

RUN mkdir /src

RUN npm install express-generator -g

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install

EXPOSE 3000

CMD node app/bin/www
