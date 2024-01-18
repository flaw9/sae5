FROM ubuntu:22.04

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y build-essential
RUN apt-get install -y curl git make
RUN curl -sL https://deb.nodesource.com/setup_21.x | bash -
RUN apt install -y nodejs
RUN npm install -g npm@latest

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]