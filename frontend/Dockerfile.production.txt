# Etapa 1: build
FROM node:22-alpine AS builder

WORKDIR /app

# Copia apenas configs para cache de dependências
# COPY . . ./
COPY package*.json ./

RUN npm install

# Copia todos os arquivos
COPY . .

# Builda a aplicação React
RUN npm run build   # cria pasta /app/build





# Etapa 2: serve estáticos
FROM nginx:stable-alpine

# Remove configuração default do Nginx (opcional)
RUN rm /etc/nginx/conf.d/default.conf

# Copia nosso nginx.conf customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos buildados do builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
