FROM node:16.19.1-slim

WORKDIR /app

COPY package*.json ./
RUN apt-get update && apt-get install -y procps
RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
