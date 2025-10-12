FROM node:22-alpine

WORKDIR /app

# Copia package.json e tsconfig
COPY package*.json tsconfig.json ./

# Instala todas as dependências, incluindo dev
RUN npm install

# Copia o código fonte
COPY src ./src

# Expõe a porta
EXPOSE 8080

# Rodar em dev com hot reload
CMD ["npx", "nodemon", "--watch", "src", "--ext", "ts", "--exec", "npx", "ts-node", "src/app.ts"]
