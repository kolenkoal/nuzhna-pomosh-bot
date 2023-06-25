FROM node:16-buster
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start" ]
