## cqx documentation for begining

### Prerequises
- [Nodejs](https://nodejs.org/) >= 14.x
- [Docker](https://docs.docker.com/get-docker/)
- [Docker-compose](https://docs.docker.com/compose/)

### Databases supported
- [PostreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Microsoft SQL Server](https://www.prisma.io/docs/concepts/database-connectors/sql-server)
- [Mysql](https://www.prisma.io/docs/concepts/database-connectors/mysql)
- [Sqlite](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
- [MongoDB](https://www.mongodb.com/)


### Documentation
- [Prisma](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) For making good schema.
- [Swagger](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) For making good api's documentation.
- [Frisby](https://docs.frisbyjs.com/) For making Api test.
- [EXpressJs](https://expressjs.com/fr/4x/api.html)


### For Begining
1. Go to **.env** and define your database connection
2. Define your model in **prisma/schema.prisma**
3. Type **docker-compose up api_db_dev** to run your Dev BD instance
4. Type **npx prisma db push** to generate artifacts and update your database structure following your model in schema.prisma file
5. Type **cqx update** update API structure following your model in schema.prisma file
6. Type **node index** to run project
7. Type **npx prisma** to show more options about prisma-cli
8. Type **cqx** for more options