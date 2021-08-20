"use strict";

const Fastify = require("fastify");
const mercurius = require("mercurius");

const app = Fastify();

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y,
  },
};

app.register(mercurius, {
  schema,
  resolvers,
});

app.get("/", async function (req, reply) {
  const query = "{ add(x: 2, y: 2) }";
  return reply.graphql(query);
});

console.log("Server listening at http://127.0.0.0/3000");
app.listen(3000);
