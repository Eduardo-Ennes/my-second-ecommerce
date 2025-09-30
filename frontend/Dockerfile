# Etapa 1: build
FROM node:22-alpine AS builder

WORKDIR /app

# Copia apenas configs para cache de dependências
COPY . . ./

RUN npm install

# Copia o código fonte
COPY src ./src

# Builda a aplicação React
RUN npm run build   # cria pasta /app/build





# Etapa 2: serve estáticos
FROM nginx:stable-alpine

# Copia os arquivos buildados do builder para o Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Remove configuração default do nginx (opcional)
RUN rm /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
