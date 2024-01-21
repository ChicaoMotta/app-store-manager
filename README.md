**English:**

# Sales Management API

Welcome to the Sales Management API! This RESTful API is designed to manage product and sales information using a layered architecture. It allows you to create, view, delete, and update products and sales. The data is stored in a MySQL database, and the application is containerized using Docker.

## Technologies Used:

- Docker
- MySQL
- Node.js
- Express.js
- mysql2 (Node.js library for MySQL)
- Mocha (Testing framework)
- Chai (Assertion library)

## Features:

- Create, view, delete, and update products and sales.
- Layered architecture for a scalable and maintainable codebase.
- Utilizes Docker for containerization.
- MySQL database for data management.

## How to Run:

To run the app, ensure you have Docker installed. Follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/sales-management-api.git
    cd sales-management-api
    ```

2. Run Docker Compose:
    ```bash
    docker-compose up -d
    ```

This command will start the app in detached mode.

## How to Test:

Run tests using Mocha and Chai:

```bash
npm install  # Install project dependencies
npm test
```

Feel free to contribute or report issues!

---

**Portuguese:**

# API de Gerenciamento de Vendas

Bem-vindo à API de Gerenciamento de Vendas! Esta API RESTful foi desenvolvida para gerenciar informações de produtos e vendas usando uma arquitetura em camadas. Permite criar, visualizar, excluir e atualizar produtos e vendas. Os dados são armazenados em um banco de dados MySQL, e a aplicação está containerizada usando Docker.

## Tecnologias Utilizadas:

- Docker
- MySQL
- Node.js
- Express.js
- mysql2 (Biblioteca Node.js para MySQL)
- Mocha (Framework de teste)
- Chai (Biblioteca de assertiva)

## Recursos:

- Criar, visualizar, excluir e atualizar produtos e vendas.
- Arquitetura em camadas para um código escalável e de fácil manutenção.
- Utiliza Docker para containerização.
- Banco de dados MySQL para gerenciamento de dados.

## Como Executar:

Para executar a aplicação, certifique-se de ter o Docker instalado. Siga estes passos:

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-nome/api-gerenciamento-vendas.git
    cd api-gerenciamento-vendas
    ```

2. Execute o Docker Compose:
    ```bash
    docker-compose up -d
    ```

Este comando iniciará a aplicação em modo destacado.

## Como Testar:

Execute os testes usando Mocha e Chai:

```bash
npm install  # Instala as dependências do projeto
npm test
```

Sinta-se à vontade para contribuir ou relatar problemas!