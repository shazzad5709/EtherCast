import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    electioncode: Number,
    officertype: String
});

const Users = models.user || model('user', userSchema)

export default Users;