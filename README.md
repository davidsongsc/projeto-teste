# Mini ERP - Clientes e Pedidos

## Descrição

Aplicação Full Stack desenvolvida como teste técnico para simular um módulo simplificado de um ERP. 

### Modulos:
- Usuario
- Cliente
- Pedidos
- Itens

## Stack Utilizada

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Antd
* Zustand
* JWT (Autenticação)

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Redis (Cache)
* JWT (Autenticação)
* bcryptjs (Hash seguro de senhas)

## DevOps

- Docker
- Docker Compose
- Git

## IA 
* Chatgpt Free
* Windsurf (plung vscode)

##  Como rodar localmente

Para rodar este projeto em sua máquina local, certifique-se de ter o **Docker** e o **Docker Compose** instalados.

### 1. Pré-requisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou Docker Engine + Docker Compose).
* Git instalado.

### 2. Clonando o Repositório
Abra o seu terminal e execute os comandos abaixo:

```bash
# Clone o repositório
git clone git@github.com:davidsongsc/projeto-teste.git

# Entre na pasta do projeto
cd projeto-teste
```

### 3. Configuração de Variáveis de Ambiente

#### projeto-teste/api/.env
#### projeto-teste/.env
- Certifique-se de **criar um arquivo** (__.env__) em cada pasta api do  **.env.exemple**, exemplo:

```
# Configurações do Banco de Dados
DB_USER=user
DB_PASSWORD=password
DB_NAME=logistic_order
DB_HOST=localhost
DB_PORT=5432

# URL de conexão do Prisma (utilizando as variáveis acima)
DATABASE_URL="postgresql://user:password@localhost:5432/logistic_order?schema=public"

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379
PORT=3030

JWT_SECRET=OdyeqJAkdFq4WuXhCAK1B42SNxETSnqzavZQonmlTkc

```
### 4. Configuração de Variáveis de Ambiente FrontEnd
 projeto-teste/web/.env
- - Certifique-se de **criar um arquivo** (__.env__) na pasta web  **.env.exemple**, exemplo:
```
NEXT_PUBLIC_API_URL=http://localhost:3030/api
```

### 5. Iniciando o Projeto com Docker
Com tudo pronto, suba os containers da aplicação (incluindo o banco de dados e o Redis):
```
# Subir os serviços em background
docker-compose build
docker-compose up -d
```
Após subir os containers, talvez seja necessario rodar o generate do prisma :
#### Migração caso não ocorra naturalmente
```
docker exec -u root -it logistic-order-api npx prisma generate
docker exec -u root -it logistic-order-api sh -c 'npx prisma migrate dev --name migracao_inicial --url "$DATABASE_URL"'
docker exec -u root -it logistic-order-api npx tsx prisma/seed.ts
```
#### 
```
```

### Projeto Link
Acesse para ver o projeto.
```
http://localhost:3000
```

### Redis
Uttilizei o rediz na camada de cache para reduzir consulttas repetitas via (get).

O Plano era desenvolver uma solução simples para um middleware reutilizavel.

O TTL escolhido foi 60 segundos, permitindo um intervalo minimo entre consultas repetitivas.
ex:
```
router.get(
    '/:id',
    cacheMiddleware('users', 60),
    controller.show)
```

Quando o middleware é chamado ele espera o __nome para o cache__ e o ___TTL___

### Swagger
Acesse para ver a documentação da api. Lista de endpoints.
```
http://localhost:3030/docs/
```

### Decisões Técnicas

Foi seguida a stack obrigatória do desafio, priorizando aderência aos requisitos e evitando overengineering.

Além disso, foram utilizadas algumas bibliotecas auxiliares para apoiar segurança, produtividade e integração da aplicação:

* **Ant Design:** utilizado para acelerar a construção da interface com componentes prontos e consistentes.
* **bcryptjs:** aplicado para hashing seguro de senhas, garantindo maior segurança no armazenamento de credenciais.
* **JWT:** utilizado para autenticação baseada em tokens.
* **CORS:** configurado de forma simples para permitir a comunicação entre frontend e backend durante o desenvolvimento.

A abordagem adotada buscou manter o projeto simples, alinhado ao escopo proposto, ao mesmo tempo em que aplicou boas práticas de segurança e organização.

                +----------------+
                |      web       |
                | Next.js        |
                +-------+--------+
                        |
                        | HTTP
                        |
                +-------v--------+
                |      api       |
                | Node/Express   |
                +---+---------+--+
                    |         |
         PostgreSQL |         | Redis
                    |         |
          +---------v-+     +-v---------+
          |    db     |     |   redis   |
          +-----------+     +-----------+

               ^
               |
        prisma migrate
               |
        +------v------+
        |   migrate   |
        +-------------+

# API Routes

## Authentication

| Method | Route           | Description                                  |
| ------ | --------------- | -------------------------------------------- |
| POST   | `/auth/login`   | Authenticate user and generate access token. |
| POST   | `/auth/refresh` | Refresh the access token.                    |
| POST   | `/auth/logout`  | Invalidate the current session/token.        |
| GET    | `/auth/me`      | Return authenticated user information.       |

---

## Users

| Method | Route        | Description                             |
| ------ | ------------ | --------------------------------------- |
| GET    | `/users`     | List users with pagination and filters. |
| GET    | `/users/:id` | Retrieve a specific user by ID.         |
| POST   | `/users`     | Create a new user.                      |
| PUT    | `/users/:id` | Update an existing user.                |
| DELETE | `/users/:id` | Remove a user.                          |

---

## Profiles

| Method | Route           | Description               |
| ------ | --------------- | ------------------------- |
| GET    | `/profiles`     | List profiles.            |
| GET    | `/profiles/:id` | Retrieve a profile by ID. |
| POST   | `/profiles`     | Create a new profile.     |
| PUT    | `/profiles/:id` | Update a profile.         |
| DELETE | `/profiles/:id` | Remove a profile.         |

---

## Permissions

| Method | Route              | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | `/permissions`     | List permissions.            |
| GET    | `/permissions/:id` | Retrieve a permission by ID. |
| POST   | `/permissions`     | Create a permission.         |
| PUT    | `/permissions/:id` | Update a permission.         |
| DELETE | `/permissions/:id` | Remove a permission.         |

---

## Collaborators

| Method | Route                       | Description                      |
| ------ | --------------------------- | -------------------------------- |
| GET    | `/collaborators`            | List collaborators.              |
| GET    | `/collaborators/:id`        | Retrieve a collaborator by ID.   |
| POST   | `/collaborators`            | Create a collaborator.           |
| PUT    | `/collaborators/:id`        | Update collaborator information. |
| PATCH  | `/collaborators/:id/status` | Update collaborator status.      |
| DELETE | `/collaborators/:id`        | Remove a collaborator.           |

---

## Customers

| Method | Route            | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/customers`     | List customers.              |
| GET    | `/customers/:id` | Retrieve a customer by ID.   |
| POST   | `/customers`     | Create a customer.           |
| PUT    | `/customers/:id` | Update customer information. |
| DELETE | `/customers/:id` | Remove a customer.           |

---

## Products

| Method | Route           | Description                 |
| ------ | --------------- | --------------------------- |
| GET    | `/products`     | List products.              |
| GET    | `/products/:id` | Retrieve a product by ID.   |
| POST   | `/products`     | Create a product.           |
| PUT    | `/products/:id` | Update product information. |
| DELETE | `/products/:id` | Remove a product.           |

---

## Orders

| Method | Route         | Description                              |
| ------ | ------------- | ---------------------------------------- |
| GET    | `/orders`     | List orders with pagination and filters. |
| GET    | `/orders/:id` | Retrieve an order by ID.                 |
| POST   | `/orders`     | Create a new order.                      |
| PUT    | `/orders/:id` | Update an existing order.                |
| DELETE | `/orders/:id` | Remove an order.                         |

---

## Items

| Method | Route        | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/items`     | List order items.       |
| GET    | `/items/:id` | Retrieve an item by ID. |
| POST   | `/items`     | Create an item.         |
| PUT    | `/items/:id` | Update an item.         |
| DELETE | `/items/:id` | Remove an item.         |

## Testes de Regras de Negócio e Permissões

Foram implementados testes unitários com foco na validação de regras de negócio do módulo de pedidos e controle de acesso baseado em perfil de usuário.

O objetivo é garantir que operações críticas não possam ser executadas em estados inválidos ou por usuários sem permissão adequada.

### Regras de negócio cobertas (Orders)

- Não permitir a criação de pedido para cliente inativo  
- Não permitir pedido sem itens  
- Não permitir item com quantidade igual a zero  

### Regras de permissão (Profiles)

- Usuários com perfil operador não podem ativar ou inativar clientes  
- A execução de ações administrativas é restrita a perfis com permissão adequada  

###  Objetivo

Esses testes garantem a integridade das regras de domínio e controle de acesso em nível de serviço, reduzindo dependência de validações na camada de interface e prevenindo execuções indevidas no sistema.
### Pontos de melhoria com mais tempo

Com mais tempo, eu finalizaria algumas pendências do front e refinaria a experiência geral da aplicação.

No backend, melhoraria o uso de cache no Redis para evitar chamadas desnecessárias ao banco e deixar a API mais eficiente.

No frontend, aplicaria cache local e pequenas otimizações para reduzir requisições e melhorar a performance.

Também investiria um pouco mais em ajustes de performance e organização geral do fluxo entre front e backend.


### Uso de IA no desenvolvimento

Uso IA mais como apoio do que como algo que “faz o código por mim”.

Normalmente eu começo um módulo do zero e faço tudo manualmente (interface, form, create, edit e integração com a API). Depois que isso está funcionando bem no front e no back, uso IA para replicar a estrutura em módulos parecidos, mudando só as regras de negócio.

Funciona bem em casos como users e customers, onde a base é quase a mesma, mas muda a semântica e alguns campos.

Também uso IA para coisas mais repetitivas, como seeds e pequenos ajustes de código, além de sugestões do editor quando estou escrevendo algo parecido com o que já fiz antes.

No geral, ela entra mais como um acelerador de produtividade do que como substituição do desenvolvimento.


### Tempo gasto

- Aproximadamente 20 horas.



### Imagens

<img width="1849" height="877" alt="usuariosDesktop" src="https://github.com/user-attachments/assets/9b89bd4a-813f-4066-9936-6dc30f5f142d" />
<img width="1887" height="511" alt="usuariosDesktopNotautorized" src="https://github.com/user-attachments/assets/ee5f0228-58da-4dd6-925f-cf7fba01dcaf" />
<img width="1872" height="710" alt="notautorized" src="https://github.com/user-attachments/assets/b251eacf-aaae-4731-959c-7a0c7b8a4399" />
<img width="1871" height="861" alt="clientesDesktop2" src="https://github.com/user-attachments/assets/f6a0fe42-72f4-42a7-92ff-78ad9101f6a2" />
<img width="1893" height="907" alt="clientesDesktop" src="https://github.com/user-attachments/assets/4a52ba4e-9991-493a-8d4a-eb466fbeea31" />
<img width="382" height="851" alt="homeMobile" src="https://github.com/user-attachments/assets/e8eaaeff-27d6-4649-9e09-6a67405a340a" />
<img width="1901" height="1075" alt="homeDesktop" src="https://github.com/user-attachments/assets/04e3fe68-80e9-4116-8fdc-de8b1880c427" />
<img width="1867" height="691" alt="login" src="https://github.com/user-attachments/assets/ce16e685-affe-42d6-9661-8eec85173481" />

