const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const app = express();

app.use(cors());

let apolloServer = null;
async function startServer() {
	apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app, path: '/api' });
}
startServer();

const server = createServer(app);

module.exports = server;
