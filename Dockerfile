FROM node:18-alpine3.16 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

CMD ["npm", "run", "start:dev"]


FROM node:18-alpine3.16 as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]