import { Schema, models, model} from 'mongoose'

const applicationSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  hashpassword: {
    type: String,
    required: true,
  },
  electionCode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  employeeID: {
    type: String,
    required: true,
  },
  orgName: String,
  
})

const Application = models.application || model('application', applicationSchema)

export default Application