// import {GraphQLServer} from 'graphql-yoga';

const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]


let idCount = links.length
// 2
const resolvers = {
  Query: {
    info: () => `this is Graphql API`,
    feed:()=>links
  },
  Mutation:{

    post:(parent, args)=>{
      const link = {
        id: `link-${idCount++}`,
        description:args.description, 
        url:args.url 
      }
      links.push(link)
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs:'src/schema.graphql',
  resolvers,
})


server.start(() => console.log("server running on http://localhost:4000"));
