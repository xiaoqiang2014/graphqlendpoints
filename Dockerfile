# Dockerfile
FROM node:latest

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install
EXPOSE 4000
CMD [ "npm", "start"]