FROM node:16-alpine

WORKDIR /src/app

COPY . .

RUN yarn install

EXPOSE 3000

ENTRYPOINT [ "yarn", "start"]
