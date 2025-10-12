# Imagem base do Node
FROM node:22-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando para dev server do Vite
CMD ["npm", "run", "dev"]
