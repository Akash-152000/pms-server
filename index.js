const connectToMongo = require('./db')
const express = require('express')
require('dotenv').config({ path: './.env' })
const cors = require("cors");


connectToMongo();
const app = express();
app.use(cors());

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world")
})


// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/properties',require('./routes/properties'))
app.use('/api/tenants',require('./routes/tenants'))

app.listen(process.env.PORT,()=>{
    console.log("Connected to server");
})