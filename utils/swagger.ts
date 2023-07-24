import swaggerJSDoc from 'swagger-jsdoc';
import express, { Application } from 'express'
import swaggerui from 'swagger-ui-express'

const app = express()
app.use(express.json())

const options:swaggerJSDoc.Options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title:"Instagram API Docs",
            version:'1.0.0'
        },
        schemas:['http' , 'https'],
        servers:[
        {
            url:"http://localhost:3000/"
        }
        ]
    },
    apis:["./routes/routes.ts"]
}

const swaggerDocs = swaggerJSDoc(options)

export const swaggerDoc = (app:Application)=>{
    try {
        
        app.use('/api',swaggerui.serve , swaggerui.setup(swaggerDocs))
    
        console.log(`swagger running at http://localhost:3000/api`);
    } catch (error) {
     console.log(error);
        
    }

}
