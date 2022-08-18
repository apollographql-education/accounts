const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { readFileSync } = require('fs');
const axios = require('axios');

const typeDefs = gql(readFileSync('./accounts.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');

const AccountsAPI = require('./datasources/accounts');

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  dataSources: () => {
    return {
      accountsAPI: new AccountsAPI(),
    };
  },
  context: async ({ req }) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization || '';
      const userId = token.split(' ')[1]; // get the user name after 'Bearer '
      if (userId) {
        const { data } = await axios
          .get(`https://rt-airlock-services-account.herokuapp.com/login/${userId}`)
          .catch((error) => {
            throw new AuthenticationError(error.message);
          });

        return { userId: data.id, userRole: data.role };
      }
    } else {
      return { userId: req.headers.userid, userRole: req.headers.userrole };
    }
  },
});

const port = process.env.PORT || 4002;
const subgraphName = 'accounts';

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
