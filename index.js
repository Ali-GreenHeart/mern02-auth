import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cloudinary from './cloudinary.js'
import upload from './multer.js'
import bcrypt from 'bcrypt'
import userModel from './model/index.js'
import jwt from 'jsonwebtoken'
import { authMiddleware } from './auth.js'
import { JWT_SECRET } from './utils.js'


mongoose.connect('mongodb+srv://mern02:mern02@cluster0.otbbzte.mongodb.net/?retryWrites=true&w=majority')
const app = express()
app.use(express.urlencoded())
app.use(express.static("./public"))

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
    return res.redirect('/signin')
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    console.log(email)
    if (!user) {
        return res.status(404).send('user not found!')
    }

    const passwordsSame = await bcrypt.compare(password, user.password)
    if (!passwordsSame) {
        return res.status(401).send('password is wrong!')
    }

    const token = jwt.sign({ email }, JWT_SECRET)
    return res.send(token)
})

app.get('/profile', authMiddleware, async (req, res) => {
    const email = req.userEmail
    console.log(email)
    const user = await userModel.findOne({ email })
    return res.send(`
                <h1>Username: ${user.username}</h1>
                <h1>Email: ${user.email}</h1>
                <img src="${user.image}" />
            `)
})

app.listen(5000, () => {
    console.log('server is up...')
})
