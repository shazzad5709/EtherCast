import { Schema, models, model} from 'mongoose'

const accountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  password: {
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
})

const Accounts = models.account || model('account', accountSchema)

export default Accounts