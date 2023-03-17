import { Schema, models, model } from "mongoose";

const forgotSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    electioncode: Number,
    officertype: String
});

const Users = models.user || model('user', forgotSchema)

export default Users;