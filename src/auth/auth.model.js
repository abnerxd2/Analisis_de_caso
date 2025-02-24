import {Schema, model} from "mongoose"


const authSchema = Schema({
    name:{
        type: String,
        require: true,
    },
    surname:{
        type: String,

    },
    email:{
        type: String,
        require: true 
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        require: true,
        enum:["ADMIN_ROLE", "USER_ROLE"]
    }
})