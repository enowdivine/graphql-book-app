import express, { Express, Request, Response } from "express";
import { graphqlHTTP } from 'express-graphql'; // ES6 // express for graphql
import http from "http";
const cors = require("cors")
import mongoose from "mongoose"
require("dotenv").config();

const schema = require("./schema/schema")

const app = express();

// database connection 
mongoose.connect(process.env.DATABASE_URL as string)
.then(()=>{
    console.log("Database connectecd 😄")
})
.catch(()  => {
    console.log("Connection Failed 😢😢")
})

app.use(cors())

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT: number | string = process.env.PORT || 5000
const server = http.createServer(app);
server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})