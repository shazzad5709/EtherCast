
const BASE_URL = "http://localhost:3000/"
// all user
export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}api/voters`)
    const json = await response.json()

    return json;
}

// single user
export const getUser = async (userId:any) => {
    const response = await fetch(`${BASE_URL}api/voters/${userId}`);
    const json = await response.json()

    if(json) return json;
    return {}
}

// posting a new user
export async function addUser(formData:any){
    try{
        const Options = {
            method : 'POST',
            headers : { 'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }
        
        const response = await fetch(`${BASE_URL}api/voters`, Options)
        const json = await response.json()

        return json;
    }catch(error){
        return error;
    }
}


// Update a new user
export async function updateUser(userId:any, formData:any){
    const Options = {
        method : 'PUT',
        headers : { 'Content-Type': "application/json"},
        body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/voters/${userId}`, Options)
    const json = await response.json()
    return json;
}


// Delete a new user
export async function deleteUser(userId:any){
    const Options = {
        method : 'DELETE',
        headers : { 'Content-Type': "application/json"},
    }

    const response = await fetch(`${BASE_URL}api/voters/${userId}`, Options)
    const json = await response.json()
    return json;
}