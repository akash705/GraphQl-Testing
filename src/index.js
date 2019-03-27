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
        },
        updateUser(parent,args){
            let f = db.users.findIndex(data=>{
                return data.name==args.oldName
            })
            
            if(~f){
                let data = {
                    name:args.newName
                }
                db.users[f]=data;
                return db.users[f];
            }
            else
                return db.users
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