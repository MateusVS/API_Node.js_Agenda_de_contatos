# API - CRUD Agenda de contatos em Node.JS
API criada em NodeJS para gerenciar Contatos

# Ferramentas
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Postman](https://www.getpostman.com/)

# Instalação

Execute os seguintes comandos em um terminal:

```
git clone https://github.com/MateusVS/API_Node.js_Agenda_de_contatos.git
```

```
cd Agenda
```

```
yarn
```

```
Renomeio o arquivo .env.example para .env
```

```
No arquivo .env insira as informações, como no exemplo a seguir:

    SERVER_PORT=3000 --> Porta em que o servidor ira rodar,
    DB_DATABASE=agenda --> Nome do banco de dados a ser criado,
    DB_USERNAME=postgres --> Seu usuário no banco de dados,
    DB_PASSWORD=password --> Senha do seu usuário no banco de dados,
    DB_HOST=127.0.0.1 --> Servidor o qual o projeto rodará, como no exemplo, localhost
    DB_DIALECT=postgres --> Banco de dados utilizado, no caso, PostgreSQL
    DB_PORT=5432 --> Porta em que o banco de dados esta rodando
    JWT_SECRET=MySecret --> Conjunto de caracteres aleatórios para servir como secret do token de validação
    JWT_TTL=86400000 --> Tempo de duração de uma sessão após usuário logado, informado em segundos


```

```
Execue o comando: npx sequelize db:create , para criar o banco de dados
```


```
Execue o comando: npx sequelize db:migrate , para gerar as tabelas
```

# Para rodar o projeto

Utilize o comando:

```
yarn start
```
