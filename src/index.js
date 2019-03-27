import { GraphQLServer , PubSub } from 'graphql-yoga';
import db from './db';
// types
// String , Boolean , Int , Float , ID

// schema

var pubsub = new PubSub();

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
        createUser(parent,args,{pubsub},info){
            db.users.push({name:args.data.name});
            pubsub.publish('insertUser',{
                insertionUser:db.users[db.users.length-1]
            })
            // return db.users[db.users.length-1];
            return "truthy";
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
    },
    Subscription:{
        count:{
            subscribe(parent,args,{pubsub},info){
                let count=0;
                // here inside publish is a channel name
                setInterval(data=>{
                    pubsub.publish('count',{
                        count:++count
                    });
                },2000)
                // returning channel name as a async iterator
                return pubsub.asyncIterator('count');
            }
        },
        insertionUser:{
            subscribe(parent,args,{pubsub},info){
                return pubsub.asyncIterator('insertUser');
            }
        }
    }
}

// server
var server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers : resolver,
    context:{
        db,
        pubsub
    }
    
});
server.start((data,err)=>{
    if(data){
        console.log('server started at',data.port);
    }
})