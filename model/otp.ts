import { Schema, models, model} from 'mongoose'

const otpSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, expires: 180 }
})
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

const OTP = models.otp || model('otp', otpSchema)

export default OTP