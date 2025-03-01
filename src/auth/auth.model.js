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
        required: true 
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum:["ADMIN_ROLE", "USER_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})



authSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

    export default model('User', authSchema);