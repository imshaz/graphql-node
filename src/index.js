// import {GraphQLServer} from 'graphql-yoga';

const { GraphQLServer } = require('graphql-yoga')
const { v4: uuid } = require('uuid');
const { prisma } = require('./generated/prisma-client')

async function main() {

  // Create a new link
  const newLink = await prisma.createLink({ 
   
    url: 'www.prisma.io',
    description: 'Prisma replaces traditional ORMs',
  })
  console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`)

  // Read all links from the database and print them to the console
  const allLinks = await prisma.links()
  console.log(allLinks)
}

main().catch(e => console.error(e))


let links = [{
  id: '9a3bce97-ff86-4a2c-823e-aabbd28e853a',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]


// let idCount = links.length
// 2
const resolvers = {
  Query: {
    info: () => `this is Graphql API`,
    feed:(root, args, context, info)=>context.prisma.links(),
    link: (root, args, context, info)=>{
      return context.prisma.link()
    }
  },
  Mutation:{
    post:(root, args, context,info)=>{
     
      return context.prisma.createLink({
        url:args.url, 
        description:args.description
      })
    },

    updateLink:(parent, args)=>{
      const {id, description, url}=args

      let index = links.findIndex(item=>{
        return item.id===id
      })

      if(index===-1) return null

      if(description){
          links[index].description=description
      }
      if(url){
        links[index].url=url
      }

      return links[index]

    },

    removeLink:(parent, args)=>{
      const {id}= args
      let index = links.findIndex(item=>{

        return item.id===id
      })

      if(index===-1) return null

      return links.splice(index, 1)[0]
    }
  }
}

const server = new GraphQLServer({
  typeDefs:'src/schema.graphql',
  resolvers,
})


server.start(() => console.log("server running on http://localhost:4000"));
