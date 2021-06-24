const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/USERS',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', ()=> console.log("DB connencted"))
db.on('error', ()=> console.log(err.message))
db.on('disconnected', ()=> console.log('mongoose disconnected'))

app.use(express.json())

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            // -1 outside the array
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))


app.listen(PORT, ()=> {
    console.log("login backend up and running.")
})
