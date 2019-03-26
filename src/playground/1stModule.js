"use strict";
var a="q";
var b="b";
var c={
    name:'c'
};

setTimeout(data=>{
    c={
        name:'c_changed'
    };
},1000);
export { a,b };
export default c;

