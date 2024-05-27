# Soccer Match Management API

## Descrição

Esta API é projetada para gerenciar times, partidas e resultados de um campeonato de futebol. Utiliza Express.js com TypeScript e integrações com Sequelize para interagir com um banco de dados relacional. A API oferece endpoints para manipulação de dados de times, usuários, partidas e classificações.

## Funcionalidades

- **Times**: Listar todos os times e obter detalhes de um time específico.
- **Usuários**: Autenticação de usuários e verificação de papéis.
- **Partidas**: Listar todas as partidas, partidas em andamento, criar, atualizar e finalizar partidas.
- **Classificação**: Gerar e listar a classificação dos times com base nos resultados das partidas.

Instalação

    Clone o repositório:

    sh

git clone https://github.com/seu-usuario/soccer-match-management-api.git
cd soccer-match-management-api

Instale as dependências:

sh

npm install

Configure o banco de dados:

    Configure o arquivo de conexão do banco de dados (.env ou config.json do Sequelize) com suas credenciais.

Execute as migrações do banco de dados:

sh

    npx sequelize-cli db:migrate

Execução

Para iniciar o servidor de desenvolvimento:

sh

npm run dev

A API estará disponível em http://localhost:3000.
Endpoints
Times

    GET /teams: Lista todos os times.
    GET /teams/:id: Obtém detalhes de um time específico.

Usuários

    POST /login: Autentica um usuário.
    GET /login/role: Obtém o papel do usuário autenticado.

Partidas

    GET /matches: Lista todas as partidas.
    GET /matches?inProgress=true: Lista partidas em andamento.
    PATCH /matches/:id/finish: Finaliza uma partida.
    PATCH /matches/:id: Atualiza os gols de uma partida.
    POST /matches: Cria uma nova partida.

Classificação

    GET /leaderboard/home: Lista a classificação dos times.

Exemplo de Uso
Criar um novo time

http

POST /teams
Content-Type: application/json

{
  "teamName": "Time Exemplo"
}

Listar todas as partidas

http

GET /matches

Finalizar uma partida

http

PATCH /matches/1/finish
Authorization: Bearer <seu-token>
