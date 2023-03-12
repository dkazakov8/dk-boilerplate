FROM node:18.6.0-slim

RUN npm install -g pnpm@6.32.3

WORKDIR /app

COPY .npmrc /app/
COPY pnpm-lock.yaml /app/
COPY package.json /app/

RUN pnpm install --prod

COPY . /app/
COPY example.prod.env /app/.env

# The way to pass env variables on docker build via --build-arg
ARG GIT_COMMIT="default"
ENV GIT_COMMIT=${GIT_COMMIT}

RUN pnpm run build

ENTRYPOINT pnpm run start
