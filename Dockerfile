FROM node:12.18-alpine
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#RUN npm install --production --silent && mv node_modules ../
RUN npm install
COPY . .

RUN npm run build
EXPOSE 80 3000
CMD ["npm", "start"]
