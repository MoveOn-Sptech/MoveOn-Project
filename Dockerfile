# 1. IMAGEM BASE: Usa Node.js 20 (LTS) sobre a distribuição Alpine (leve e segura).
FROM node:20-alpine

# 2. DIRETÓRIO DE TRABALHO: Define o diretório onde o código será colocado.
WORKDIR /usr/src/app

# 3. OTIMIZAÇÃO DE CACHE: Copia apenas os arquivos de dependência.
# Isso garante que a instalação do NPM só seja refeita se o package.json mudar.
COPY package*.json ./

# 4. INSTALAÇÃO DE DEPENDÊNCIAS
RUN npm install

# 5. COPIA O CÓDIGO DA APLICAÇÃO: Copia o restante do projeto.
COPY . .

# 6. PORTA: Documenta a porta que a aplicação irá usar.
EXPOSE 3000

# 7. DEFINIÇÃO DE VARIÁVEIS DE AMBIENTE NÃO-SECRETAS
# Variáveis como APP_HOST, DB_HOST e senhas NUNCA devem estar aqui.
ENV APP_PORT=3000
ENV AMBIENTE_PROCESSO=producao

# 8. COMANDO DE INICIALIZAÇÃO (ENTRYPOINT e CMD)
# ENTRYPOINT define o executável principal, e CMD define o parâmetro padrão.
# A forma mais robusta e preferida pelo Docker:
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
