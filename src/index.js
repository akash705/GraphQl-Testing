import { GraphQLServer } from 'graphql-yoga';
// types
// String , Boolean , Int , Float , ID
var users=[{
    name:'Aaksh'
}]
var x=[{
    name:'X value'
}]
// schema
const typeDef=`
    type Query {
        name (name: String) : String!
        user:[users!]!
    }
    type Mutation {
        createUser(name:String!):users!
    }
    type users{
        name(name:String):String!
    }
`

// endpoints resolver
const resolver ={
    Query: {
        user:()=>{
            return users;
        },
        name:()=>{
            return "akasj"
        }
    },
    Mutation:{
        createUser(parent,args){
            users.push({name:args.name});
            return users[users.length-1];
        }
    }
}

// server
var server = new GraphQLServer({typeDefs:typeDef,resolvers : resolver});
server.start((data,err)=>{
    if(data){
        console.log('server started at',data.port);
    }
})