const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const boardRouter = require('./routes/boards');
const listRouter = require('./routes/lists');
const authRoutes = require('./routes/auth');

const app = express();

//Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // Ensure this matches your frontend origin
    credentials: true, // This is needed if your requests involve cookies or authorization headers
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
  }));

app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("mongodb connected")})
.catch(error =>{console.log('error connecting to db',error)});

//Routes
app.use('/api/boards', boardRouter);
app.use('/api/lists', listRouter);
app.use('/api/auth', authRoutes);

//listen to the requests
app.listen(5000, ()=>{
    console.log('server is listening at', 5000);
});