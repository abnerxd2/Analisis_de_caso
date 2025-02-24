import {Schema, moel} from "mongoose"

const categorySchema = Schema({
    name:{
        type: String,
        require: true
    },
    descryption:{
        type: String,
        require: true
    }

})

export default model('Category', categorySchema);