import { GraphQLServer } from 'graphql-yoga';
// types
// String , Boolean , Int , Float , ID

// schema
const typeDef=`
    type Query {
        name : String!
        id : ID!
        status: Boolean!
        Age: Int!
        BagCapacity: Float! 
    }
`

// endpoints resolver
const resolver ={
    Query: {
        name:()=>{
            return getRandomName();
        },
        id:()=>{
            return 50;
        },
        status:()=>{
            return true
        },
        Age:()=>{
            return 20.0
        },
        BagCapacity:()=>{
            return 50;
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