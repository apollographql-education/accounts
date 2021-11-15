const { ApolloServer } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const AccountsAPI = require('./datasources/accounts');

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  dataSources: () => {
    return {
      accountsAPI: new AccountsAPI(),
    };
  },
  context: ({ req }) => {
    return { userId: req.headers.userid, userRole: req.headers.userrole };
  },
});

const port = process.env.PORT || 4002;
const subgraphName = 'accounts';

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
});
