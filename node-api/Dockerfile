FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./


RUN npm install --legacy-peer-deps

COPY ./src ./src

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/main.js"]
