FROM node:16-alpine

WORKDIR /src/app

COPY . .

RUN yarn install
RUN yarn build
RUN yarn add serve

EXPOSE 3000

ENTRYPOINT [ "yarn", "serve", "-s", "build"]
