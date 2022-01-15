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

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;

const typeDefs = importSchema("./backend/schema.graphql");
const pubsub = new PubSub();
const app = express();

app.use(cors());
app.use("/api", router);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

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
server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

connection();

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});


// server.start({ port: process.env.PORT | 5000 }, () => {
//   console.log(`The server is up on port ${process.env.PORT | 5000}!`);
// });