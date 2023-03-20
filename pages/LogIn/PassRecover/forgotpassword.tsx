import connectMongo from '../../../database/conn'
import connectToDatabase from '../../../lib/mongodb'
import Users from '../../../model/user'

// export default async function getData(req:any, res:any) {
//   const { email } = req.body
//   const db = await connectMongo()
//   const model = await Users.findById({email}).exec()
//   res.status(200).json({ data: model })
// }
