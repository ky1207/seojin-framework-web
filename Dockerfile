#FROM node:16.14.2
FROM public.ecr.aws/docker/library/node:16.14.2-alpine3.15
RUN npm install -g npm@8.6.0



# Create app directory
WORKDIR /app

COPY ./package.json ./
# 모듈 설치
RUN npm install

# 소스 복사
COPY ./.nuxt/dist ./.nuxt/dist
#CDN  사용시
#COPY ./.nuxt/dist/server ./.nuxt/dist/server

COPY ./schemes ./schemes
COPY ./.env.* ./
COPY ./nuxt.config.js ./


# start command
CMD [ "npm","run" ,"dev" ]