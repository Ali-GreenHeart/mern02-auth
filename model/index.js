import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    image: String
})

const userModel = mongoose.model('user', userSchema)
export default userModel;
