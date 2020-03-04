// import {GraphQLServer} from 'graphql-yoga';

const { GraphQLServer } = require('graphql-yoga')


// 1
const typeDefs = `
type Query{
    info:String!
}
`;

// 2

const resolvers = {
  Query: {
    info: () => `this is Graphql API`
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("server running on http://localhost:4000"));
