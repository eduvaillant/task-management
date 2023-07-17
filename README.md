# Task Management

## Visão Geral

O sistema permite que os usuários criem, leiam, atualizem e excluam tarefas. Cada tarefa possui um título, uma descrição, uma data de conclusão e um status (pendente, em andamento ou concluída). Os usuários podem se cadastrar, fazer login e gerenciar suas próprias tarefas.

## Tecnologias Utilizadas

- NestJS
- Prisma
- Jest
- Postgres
- Docker
- Docker Compose
- Github Actions

## Funcionalidades

### Autenticação:

- Os usuários devem poder se cadastrar fornecendo um nome de usuário, um endereço de e-mail e uma senha.
- Os usuários registrados devem poder fazer login no sistema.

### Gerenciamento de Tarefas:

- Os usuários autenticados devem poder criar uma nova tarefa especificando o título, a descrição, a data de conclusão e o status.
- Os usuários devem poder visualizar uma lista de suas próprias tarefas.
- Os usuários devem poder atualizar as informações de uma tarefa existente, como título, descrição, data de conclusão e status.
- Os usuários devem poder excluir uma tarefa existente.

### Filtragem de Tarefas:

- Os usuários devem poder filtrar suas tarefas com base no status, como exibir apenas tarefas concluídas ou tarefas em andamento.

## Rodando os testes

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Rodando a aplicação

Obs: Para rodar a aplicação é necessário ter o Docker e o Docker compose instalados na máquina.

Passo a passo:

1. Renomear o arquivo `.env.sample` para `.env`.
2. Alterar a variável `PORT` caso necessário.
3. Alterar a porta do Postgres no arquivo `docker-compose.yml` caso necessário. Caso altere a porta, altere a porta na variável do `DATABASE_URL` no `.env` também.
4. Rodar o seguinte comando:

```bash
# Start
$ docker-compose up -d

# Stop
$ docker-compose down
```

Após rodar o comando acima, a aplicação será inicializada na porta definida no `.env`

## Documentação

Para a documentação, foi utilizado módulo `@nestjs/swagger`, que gera a documentação dos endpoits através de decorators adicionados no código.
Essa documentação pode ser visualizada em `localhost:PORT/api`, e contém a documentação de todos os endpoints desenvolvidos, bem como os status code retornardos e exemplos dos bodys das requisições.
