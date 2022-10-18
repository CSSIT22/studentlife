FROM node:16.15-alpine3.16

WORKDIR /modlifes

COPY ./dist/modlifes-bundled.js .

COPY ./prisma/ ./prisma/

# RUN npm ci --only=production

# RUN npm run db:gen

EXPOSE 8000

CMD [ "node", "modlifes-bundled.js" ]