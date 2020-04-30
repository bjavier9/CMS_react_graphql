import {ApolloServer,makeExecutableSchema} from 'apollo-server'
//type definitions

const typeDefs=`type Hello{
    message: String!
}

type Query{
    sayHello(name:String!):Hello
}`

const resolvers = {
    Query:{
        sayHello:(_, args)=>{
            return {
                message:`Hello ${args.name||'world'}`
            }
        }
    }
}
const schema=makeExecutableSchema({
    typeDefs,
    resolvers
})

const apolloServer = new ApolloServer({
    schema
})

apolloServer.listen(5000).then(({url})=>console.log(`Running on ${url}`))