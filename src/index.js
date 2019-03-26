import { GraphQLServer } from 'graphql-yoga';

// schema
const typeDef=`
    type Query {
        name : String!
    }
`

// endpoints resolver
const resolver ={
    Query: {
        name:()=>{
            return getRandomName();
            // return "Akash";
        }
    }
}
function getRandomName(){
    console.log('randome name called');
    return "Ahsk";
}

// server
var server = new GraphQLServer({typeDefs:typeDef,resolvers : resolver});
server.start((data,err)=>{
    if(data){
        console.log('server started at',data.port);
    }
})