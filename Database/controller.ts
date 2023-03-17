
/** Controller */
import Users from '../model/user'

// get : http://localhost:3000/api/users
export async function getUsers(req:any, res:any){
    try {
        const users = await Users.find({})

        if(!users) return res.status(404).json( { error: "Data not Found"})
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json( { error : "Error While Fetching Data"})
    }
}
export async function getUser(req:any, res:any){
    try {
        const { userId }:any = req.query;

        if(userId){
            const user:any = await Users.findById(userId);
            res.status(200).json(user)
        }
        res.status(404).json({ error : "User not Selected...!"});
    } catch (error) {
        res.status(404).json({ error: "Cannot get the User...!"})
    }
}
// post : http://localhost:3000/api/users
export async function postUser(req:any, res:any){
    try {
        const formData = req.body;
        if(!formData) return res.status(404).json( { error: "Form Data Not Provided...!"});
        Users.create( formData)
    } catch (error) {
        return res.status(404).json({ error })
    }
}

// update :  http://localhost:3000/api/users/1
export async function putUser(req:any, res:any){
    try {
        const { userId } = req.query;
        const formData = req.body;

        if(userId && formData){
            const user = await Users.findByIdAndUpdate(userId, formData);
            res.status(200).json(user)
        }
        res.status(404).json( { error: "User Not Selected...!"})
    } catch (error) {
        res.status(404).json({ error: "Error While Updating the Data...!"})
    }
}

// delete : http://localhost:3000/api/users/1
export async function deleteUser(req:any, res:any){
    try {
        const { userId } = req.query;

        if(userId){
            const user = await Users.findByIdAndDelete(userId)
            return res.status(200).json(user)
        }

        res.status(404).json({ error: "User Not Selected...!"})

    } catch (error) {
        res.status(404).json({ error: "Error While Deleting the User...!"})
    }
}