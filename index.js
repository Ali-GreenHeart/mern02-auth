import express from 'express'
import path from 'path'

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
