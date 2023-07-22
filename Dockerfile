FROM node:alpine

#ENV API_PORT
#ENV ENABLE_REDIS
#ENV REDIS_HOST
#ENV REDIS_PORT

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENTRYPOINT ["npm","run","start"]