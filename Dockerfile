FROM node:7.7.2-alpine
WORKDIR .
COPY package.json .
RUN npm install --quiet
COPY . .
