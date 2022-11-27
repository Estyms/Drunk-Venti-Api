FROM node:alpine

ENV API_PORT=3000
ENV ENABLE_REDIS=true
ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENTRYPOINT ["npm","run","start"]