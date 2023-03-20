import { Schema, models, model } from "mongoose";

const candidateSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    electioncode: { type: Number, required: true},
});

const Candidate = models.candidate || model('candidate', candidateSchema)

export default Candidate;