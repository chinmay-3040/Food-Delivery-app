// Import required modules
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT||5100;
const mongoDB = require('./db');
const { ResultWithContextImpl } = require('express-validator/src/chain');
mongoDB();
// Define a route



//Following fucntion is an essential middlewear fucntion that is connecting front-end to the back-end.

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
})

app.use(express.json());   // enables req.body fucntion to work and access the json object..
app.use('/api', require("./Routes/createUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));


app.get('/', (req, res) => {
  res.send('Hello, World!');
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
