import { ApolloServer} from 'apollo-server'
import mongoose from 'mongoose'
import gql from 'graphql-tag';

//type definitions
import conn from '../config';
import Post from './models/Post';


const typeDefs = gql`
type Post{
    id: ID!,
    body:String!,
    createdAt:String!,
    username:String!
}

type Query{
    getPost:[Post]
}
`;

const resolvers = {
    Query: {
        async getPost() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})


mongoose.connect(conn.MONGODB, { useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
    return apolloServer.listen(5000)
})
.then(({ url }) => console.log(`Running on ${url}`))