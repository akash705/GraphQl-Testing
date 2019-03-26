import { GraphQLServer } from 'graphql-yoga';
import db from './db';
// types
// String , Boolean , Int , Float , ID

// schema


// endpoints resolver
const resolver ={
    Query: {
        user:()=>{
            return db.users;
        },
        name:()=>{
            return "akasj"
        }
    },
    Mutation:{
        createUser(parent,args){
            db.users.push({name:args.data.name});
            return db.users[db.users.length-1];
        }
    }
}

// server
var server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers : resolver,
    context:{
        db
    }
    
});
server.start((data,err)=>{
    if(data){
        console.log('server started at',data.port);
    }
})