//express server

const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(express.json()) //to use request.body 

// Define a route for the root path ('/')
//avilabel routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})