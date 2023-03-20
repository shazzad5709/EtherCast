import { useReducer } from "react"
import { BiBrush } from 'react-icons/bi'
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getUser, getUsers, updateUser } from "../../lib/helper"

export default function UpdateUserForm({ formId, formData, setFormData }:any){

    const queryClient = useQueryClient()
   const {isLoading, isError, data, error} = useQuery(['user', formId], () => getUser(formId))
    const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
        onSuccess : async (data) => {
            // queryClient.setQueryData('users', (old) => [data])
            queryClient.prefetchQuery('user', getUsers)
        }
    })

   if(isLoading) return <div>Loading...!</div>
   if(isError) return <div>Error</div>

   const { name,officertype,electioncode,email } = data;
   const [firstname, lastname] = name ? name.split(' ') : []

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`;
        let updated = Object.assign({}, data, formData, { name: userName})
        await UpdateMutation.mutate(updated)
    }

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={lastname} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={email} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={officertype} name="officertype" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="officertype" />
            </div>
            <div className="input-type">
                <input type="number" onChange={setFormData} defaultValue={electioncode} name="electioncode" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="electioncode" />
            </div>

            <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
             Update <span className="px-1"><BiBrush size={24}></BiBrush></span>
            </button>

        </form>
    )
}