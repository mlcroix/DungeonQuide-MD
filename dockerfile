FROM node:26-alpine


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

RUN npm run build

RUN chown -R node:node /app
USER node

CMD ["npm", "run", "dev"]