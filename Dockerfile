FROM node:16-alpine

WORKDIR /usr/app

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn","start"]