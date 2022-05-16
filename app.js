const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, ()=>{
    console.log("Database Connected");
});

//Routes
const registerRoute = require('./controller/register');
const adminRoute = require('./controller/admin');
const loginRoute = require('./controller/login');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/register', registerRoute);
app.use('/admin', adminRoute);
app.use('/login', loginRoute);



app.listen(process.env.PORT);