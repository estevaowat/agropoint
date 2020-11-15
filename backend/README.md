# Olá.

O agropoint é um projeto que consiste em pegar um arquivo CSV com a latitude e longitude, salvar no banco de dados e mostrar no mapa as posições geográficas.

Esse é o backend do projeto agropoint, desenvolvido usando:
A parte do front-end está no seguinte repositório: [link para o repositório](https://github.com/estevaowat/agropoint-frontend)

- [Typescript](https://www.typescriptlang.org)

- [GoogleMapsApi](https://cloud.google.com/maps-platform/)

- [TypeOrm](https://typeorm.io/#/)

- [Heroku](https://www.heroku.com/home)

- [Jest](https://jestjs.io/)

## Como rodar em modo de desenvolvimento

- Rodar o comando `yarn` para instalar as dependências do node.
- Criar um contêiner docker para criar o banco de dados. Exemplo:
  `docker run --name agropoint -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
- Copiar o arquivo `.env.example` e criar um arquivo `.env` configurando as variáveis de ambiente.
- Rodar o comando `yarn migrate` para criar as tabelas no banco de dados.
- Rodar o comando `yarn dev:server` para iniciar o projeto em desenvolvimento

## Rotas

/ : post

- Usado para pegar a url, baixar o csv e salvar os dados do csv no banco de dados e mostrar os dados que foram salvos no banco de dados.

Exemplo:

```

{

"url": "https://blabla.com/sample.test.csv"

}

```

/paths : get

- Pegar todos os caminhos que estão usados no banco, utilizado no combobox para carregar os dados já salvos no banco de dados.

/positions : post

- Pegar todas as posições geográficas do banco de dados que estão associadas com o caminho passado pelo parâmetro.

```

{

"url": "https://blabla.com/sample.test.csv"

}

```
