const express = require('express');
const mongoose=require('mongoose') 
const { PORT,mongoURL } = require('./config');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
app.use('/employee',require('./routes/employeeRoute'))
app.use('/role',require('./routes/roleRoute'))
// app.use('/login', require('./routes/loginRoutes'));
app.get('/',(req,res)=>{
    res.status(200).send('Welcome to app')
})
app.post('/login',(req,res)=>{
    res.status(200).send('Welcome to login app')
})
mongoose.connect(mongoURL).then(()=>{
    console.log("App Connected to Database");
}).catch(e=>{
    console.log("Database connection Error:",e);
})

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
