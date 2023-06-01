FROM node:17-alpine
WORKDIR /app
COPY package.json .
RUN npm i 
COPY . .
EXPOSE 4173
CMD ["npm", "run", "preview"]
# CMD ["npm", "run", "dev"]