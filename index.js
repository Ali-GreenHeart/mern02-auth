import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
mongoose.connect('mongodb+srv://mern02:mern02@cluster0.otbbzte.mongodb.net/?retryWrites=true&w=majority')
const app = express()

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve("./pages/signup.html"))
})
app.get('/signin', (req, res) => {
    res.sendFile(path.resolve("./pages/signin.html"))
})

app.listen(5000, () => {
    console.log('server is up...')
})
