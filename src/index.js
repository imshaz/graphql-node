// import {GraphQLServer} from 'graphql-yoga';

const { GraphQLServer } = require('graphql-yoga')
const { v4: uuid } = require('uuid');
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
    feed:()=>links,
    link: (parent, args, context, info)=>{
      const {id} =args
        let index = links.findIndex(item=>{
            return item.id===id
          }
        )
      // if(index===-1) return null
      // let item= links.splice(index, 1)
      return links[index]
    }
  },
  Mutation:{
    post:(parent, args)=>{
      const link = {
        id: uuid(),
        description:args.description, 
        url:args.url 
      }
      links.push(link)
      return link
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
