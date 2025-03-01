import express from 'express';
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import apiLimiter from "../src/middlewere/rate-limit-validaror.js"
import authroutes from "../src/auth/auth.routes.js"
import clienroutes from "../src/clients/clients.routes.js"
import { dbConnection } from './mongo.js';
import { swaggerDocs, swaggerUi } from "./swagger.js"
import createAdmin from '../src/auth/auth.controller.js';


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*', // Permitir todas las solicitudes de origen
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"))
    app.use(apiLimiter)
}


const routes = (app) =>{
    app.use("/Supermercado/v1/auth", authroutes)
    app.use("/Supermercado/v1/client",clienroutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}


const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database conection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try {
        createAdmin()
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on part: ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}
 