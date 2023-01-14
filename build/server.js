"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const context_1 = require("./context");
new apollo_server_1.ApolloServer({
    resolvers: schema_1.resolvers,
    typeDefs: schema_1.typeDefs,
    context: context_1.context,
    cors: {
        origin: '*',
    }
}).listen({ port: 4000 }, () => console.log(`
🚀 Server ready at: http://localhost:4000
⭐️ See sample queries: http://pris.ly/e/ts/graphql-sdl-first#using-the-graphql-api`));
