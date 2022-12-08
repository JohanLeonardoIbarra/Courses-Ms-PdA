FROM node:16-alpine

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

COPY dist ./dist

CMD [ "npm", "run", "start" ]
