import { Schema, models, model} from 'mongoose'

const accountSchema = new Schema({
  username: String,
  usertype: String,
  password: String,
  name: String,
  email: String,
  phone: String,
})

const Accounts = models.account || model('account', accountSchema)

export default Accounts