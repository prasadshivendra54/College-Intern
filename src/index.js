const express = require('express')
const mongoose = require('mongoose')
const router = require('./routers/route')
const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://tshivendra07:6sWDbb2xoYJ5IZ0N@cluster0.3dhywqg.mongodb.net/college-intern?retryWrites=true&w=majority', {
    useNewUrlParser : true
}).then(() =>{
    console.log('Database Connected')
}).catch((error) =>{
    console.log(error.message)
})

app.use('/', router)

const PORT = process.env.PORT || 1100

app.listen(PORT, () =>{
    console.log(`App is running on http://localhost:${PORT}`)
})