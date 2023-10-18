const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema.graphql');
const resolvers = require('./resolvers');

async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    await server.start();
    server.applyMiddleware({app});

    var port = process.env.PORT || 4000
    
    app.listen(port, () => {
    console.log(`Server is listening on port ${port}${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers)