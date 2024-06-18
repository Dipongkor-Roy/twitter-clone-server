import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { User } from "./user";

export async function initServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json()); //body-parser imp for use
  const graphqlServer = new ApolloServer({
    typeDefs: `
           ${User.types}
           type Query {
    ${User.queries}
    }
           `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });
  await graphqlServer.start();
  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
