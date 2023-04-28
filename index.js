import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cloudinary from './cloudinary.js'
import upload from './multer.js'
import bcrypt from 'bcrypt'
import userModel from './model/index.js'

mongoose.connect('mongodb+srv://mern02:mern02@cluster0.otbbzte.mongodb.net/?retryWrites=true&w=majority')
const app = express()

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve("./pages/signup.html"))
})
app.get('/signin', (req, res) => {
    res.sendFile(path.resolve("./pages/signin.html"))
})
app.post("/signup", upload.single('image'), async (req, res) => {
    const { secure_url } = await cloudinary.uploader.upload(
        req.file.path,
        { public_id: req.file.originalname }
    )
    const pwsrd = await bcrypt.hash(req.body.password, 10)
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: pwsrd,
        image: secure_url
    }
    userModel.create(newUser)
    res.send('has been created successfully!')
})

app.listen(5000, () => {
    console.log('server is up...')
})
