// import {GraphQLServer} from 'graphql-yoga';

const { GraphQLServer } = require('graphql-yoga')


// 1
const typeDefs = `
type Query{
    info:String!
    users: [User!]
    user(id:ID!):User!
}

type Mutation {
    createUser(id:String!): User!
}

type User{
    id:ID!
    name:String!
}
`;

// 2
const resolvers = {
  Query: {
    info: () => `this is Graphql API`,
    users:()=>{id='users', name='name'}
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("server running on http://localhost:4000"));
