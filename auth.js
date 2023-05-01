import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './utils.js'

export function authMiddleware(req, res, next) {
    const token = req.headers?.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).send("Token yoxdur!")
    }
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) {
            return res.send('token yanlisdir')
        } else {
            req.userEmail = data.email
        }
    })
    next()
}

export function getEmailFromToken(req, res, next) {
    const { token } = req.params
    if (!token) {
        return res.status(401).send("Token yoxdur!")
    }
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) {
            return res.send('token yanlisdir')
        } else {
            req.userEmail = data.email
        }
    })
    next()
}

