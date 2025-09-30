# Etapa 1: build
FROM node:22-alpine AS builder

WORKDIR /app

COPY .env package.json package-lock.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build



# Etapa 2: runtime
FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY .env ./

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/app.js"]