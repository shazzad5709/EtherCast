import { Schema, models, model } from "mongoose";

const forgotSchema = new Schema({
    email: String,
    password: Number
});

const Forgot = models.user || model('user', forgotSchema)

export default Forgot;