const express = require('express');
const mongoose=require('mongoose') 
require('dotenv').config();
const { dbConfig,portConfig } = require('./config');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors())
app.use('/employee',require('./routes/employeeRoute'))
app.use('/role',require('./routes/roleRoute'))
app.use('/login',require('./routes/loginRoute'))
app.get('/',(req,res)=>{
    res.status(200).send('Welcome to app')
})

mongoose.connect(dbConfig.uri).then(()=>{
    console.log("App Connected to Database");
}).catch(e=>{
    console.log("Database connection Error:",e);
})

app.listen(portConfig.port, () => console.log(`Server running on PORT:${portConfig.port}`));
