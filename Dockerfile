FROM node:15.3.0-alpine3.10
WORKDIR /usr/src/app
RUN apk add --no-cache openjdk8-jre
RUN npm i -g firebase-tools && firebase setup:emulators:firestore