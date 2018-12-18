import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const PORT = 4000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

models.sequelize.sync({ force: true }).then(() => {
  app.listen(4000);
});

// app.listen({ port : PORT }, () =>
//   console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
// )