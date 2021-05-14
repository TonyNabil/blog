FROM node:carbon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3099
EXPOSE 9200

CMD ["npm","start"]
