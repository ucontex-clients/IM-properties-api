const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const port = process.env.PORT
const dbURI = process.env.MONGO_URI
const app = express()


//MongoDB connection
const conn = mongoose.connect(dbURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('MongoDB Connected')
})
.catch((err)=>{
    console.log(err)
})

//Middleware setup
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/authRoutes/authUserRoutes'))
app.use('/api/user', require('./routes/userRoutes/userRoute'))

app.use("*", (req, res) => {
    return res.status(404).json({ error: { messgage: "Route Not Found" } });
  });

app.listen(port,console.log(`server running on ${port}`))