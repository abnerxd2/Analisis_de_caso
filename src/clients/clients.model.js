import {Schema, model} from "mongoose"

const clientsSchema = Schema({
    name:{
        type: String,
        require: true
    },
    puntuacion:{
        type: Number,
        min:[0],
        max:[10, "La calificacion no puede exeder de 10 estrellas"]
    },
    trajectory:{
        type: Number,
    },
    category:{
        type: Schema.Type.ObjectId,
        ref: "Category"
    }
})