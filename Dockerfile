# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "build/server.js"]
EXPOSE 4000