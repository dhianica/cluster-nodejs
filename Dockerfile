FROM node:alpine
WORKDIR /application/app
COPY ./ /application
COPY /app/package.json ./application/app
WORKDIR /application/app
RUN npm install

CMD ["npm", "start"]