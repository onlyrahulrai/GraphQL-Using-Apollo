import "dotenv/config";
import "colors"
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import typeDefs from "./graphql/typedefs.js";
import resolvers from "./graphql/resolvers/index.js";

// import { uuid } from "uuidv4";

import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
const app = express();

connectDB()

app.use(cors());
app.use(bodyParser.json());

const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

app.get("/",(req,res) => res.send(" Welcome, John Doe "));

await new Promise((resolve) =>
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  })
);
