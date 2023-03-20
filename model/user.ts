import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    electioncode: { type: Number, required: true},
    officertype:{ type: String, required: true },
});

const Users = models.user || model('user', userSchema)

export default Users;