# dockerfile -> arquivo declarativo de contrução de imagem do docker

# 1 - ter baixado o node
FROM node:20

# 2 - ter a web data viz
COPY . .

# 2.1 - configurar variaveis ambiente
ENV APP_PORT=3000
ENV APP_HOST=localhost
ENV AMBIENTE_PROCESSO=producao

# 3 - intalar as dependecias -> npm i
RUN npm install

EXPOSE 3000

# 4 - executar projeto -> npm start 
ENTRYPOINT [ "npm", "start" ]