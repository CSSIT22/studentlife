FROM node:16.15-alpine3.16 AS builder

WORKDIR /modlifes

COPY ./backend ./backend

COPY ./types ./types

RUN npm i

RUN npm run build

FROM node:16.15-alpine3.16

WORKDIR /modlifes

COPY --from=builder /modlifes/backend/build/ ./build/

COPY --from=builder /modlifes/backend/package*.json ./

COPY --from=builder /modlifes/backend/prisma/ ./prisma/

RUN npm ci --only=production

RUN npm run db:gen

EXPOSE 8000

CMD [ "npm", "run", "start" ]