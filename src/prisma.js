const prisma = new Prisma({
    typeDefs: 'schemas/database.graphql',
    endpoint: 'https://us1.prisma.sh/demo/my-service/dev',
    secret: 'my-super-secret-secret'
  })