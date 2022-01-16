import express from "express";
import cors from "cors";
import router from "./routes/index";
import bodyParser from "body-parser";
// import dataInit from "./upload";
import { importSchema } from "graphql-import";
import http from "http";
import "dotenv-defaults/config.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { GraphQLServer, PubSub } from "graphql-yoga";
import * as db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import Message from "./resolvers/Message";
import ChatBox from "./resolvers/ChatBox";
import connection from "./mongo";

const typeDefs = importSchema("./src/schema.graphql");
const pubsub = new PubSub();
// const port = process.env.PORT || 4000;

const server = new GraphQLServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Message,
    ChatBox,
  },
  context: {
    db,
    pubsub,
  },
});

connection();
server.express.use(cors());
server.express.use("/api", router);
server.express.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
  server.express.use(express.static(path.resolve("../frontend", "build")));
  server.express.get("/*", function (req, res) {
    res.sendFile(path.resolve("../frontend", "build", "index.html"));
  });
}
// httpServer.listen(port, () => {
//   console.log(`🚀 Server Ready at ${port}! 🚀`);
//   console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
// });

const opt = {
  port: process.env.PORT || 5000,
  endpoint: "/graphql",
};

server.start(opt, () => {
  console.log(`The server is up on port ${opt.port}!`);
});
