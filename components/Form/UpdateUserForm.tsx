import React from 'react'
import { useReducer } from "react"
import { BiBrush } from 'react-icons/bi'
import Success from "../success"
import Bug from "../bug"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getUser, getUsers, updateUser } from "../../lib/helper"

export default function UpdateUserForm(props:any){

    const queryClient = useQueryClient()
   const {isLoading, isError, data, error} = useQuery(['users', props.formId], () => getUser(props.formId))
    const UpdateMutation = useMutation((newData) => updateUser(props.formId, newData), {
        onSuccess : async (data) => {
            // queryClient.setQueryData('users', (old) => [data])
            queryClient.prefetchQuery('users', getUsers)
        }
    })

   if(isLoading) return <div>Loading...!</div>
   if(isError) return <div>Error</div>

   const { name,email, electioncode,officertype } = data;
   const [firstname, lastname] = name ? name.split(' ') : props.formData

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        let userName = `${props.formData.firstname ?? firstname} ${props.formData.lastname ?? lastname}`;
        let updated = Object.assign({}, data, props.formData, { name: userName})
        await UpdateMutation.mutate(updated)
    }
 
  return (
    <>
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={props.setFormData} defaultValue={firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={props.setFormData} defaultValue={lastname} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="email" onChange={props.setFormData} defaultValue={email} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="number" onChange={props.setFormData} defaultValue={electioncode} name="electioncode" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Election Code" />
            </div>
            <div className="input-type">
                <input type="text" onChange={props.setFormData} defaultValue={officertype} name="officertype" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Officer Type" />
            </div>
            <div></div>

            <button className="flex justify-center text-md w-2/6 bg-cyan-800 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-cyan-800 hover:text-cyan-800">
             Update <span className="px-1"><BiBrush size={24}></BiBrush></span>
            </button>

        </form>
    </>
  )
}
