import { Schema, models, model } from "mongoose";

const voterSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    electioncode: { type: Number, required: true},
});

const Voter = models.voter || model('voter', voterSchema)

export default Voter;