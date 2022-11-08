FROM node:16.15-alpine3.16

WORKDIR /modlifes

COPY . .

RUN npm i

# RUN npm ci --only=production

# RUN npm run db:gen

EXPOSE 8000

CMD [ "npm", "run", "start" ]