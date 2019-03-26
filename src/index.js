import { GraphQLServer } from 'graphql-yoga';
// types
// String , Boolean , Int , Float , ID
var users=[{
    name:'Aaksh'
}]
// schema
const typeDef=`
    type Query {
        name (name: String) : String!
        id : ID!
        status: Boolean!
        Age: Int!
        BagCapacity: Float! 
        obj: Obj!
        arr:[Int]!
        sum(num:[Int!]): Int!
        user:users!
    }
    type Obj {
        name : String!
        class:String
    }
    type users{
        name(name:String!):String!
    }
`

// endpoints resolver
const resolver ={
    Query: {
        name(parent,args,ctx,info){
            return "Hello "+args.name
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
        },
        obj(){
            return {
                name:'Akash',
                class:"SSSS"
            }
        },
        arr(){
            return [1,2,3];
        },
        sum(parent,args){
            console.log(args);
            if(!args.num.length)
                return 0;
            return args.num.reduce((prev,current)=>{
                return prev+current;
            })
        },
        user(){
            return users[0]
        }
    },
    // overloading schma entry user with type Users
    users:{
        name(parent,args){
            console.log(args);
            return "shaktimaan"
        }
    }
}
function getRandomName(){
    // console.log('randome name called');
    return "Ahsk";
}

// server
var server = new GraphQLServer({typeDefs:typeDef,resolvers : resolver});
server.start((data,err)=>{
    if(data){
        console.log('server started at',data.port);
    }
})