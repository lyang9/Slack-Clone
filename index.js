import express from 'express';
// import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const PORT = 8000;

const app = express();

app.use(cors('*'));

// const graphqlEndpoint = '/graphql';

// app.use(
//   graphqlEndpoint,
//   bodyParser.json(),
//   graphqlExpress({
//     schema,
//     context: {
//       models,
//       user: {
//         id: 1,
//       },
//     },
//   }),
// );

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    user: {
      id: 1
    }
  }
});
server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen(8000);
});

// app.listen({ port : PORT }, () =>
//   console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
// )