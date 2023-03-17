import React from 'react'
import { useReducer } from "react"
import { BiPlus } from 'react-icons/bi'
import Success from "../success"
import Bug from "../bug"
import { useQueryClient, useMutation } from 'react-query'
import { addUser, getUsers } from '../../lib/helper'

export default function AddUserForm(props:any){

    const queryClient = useQueryClient()
    const addMutation:any = useMutation(addUser, {
        onSuccess : () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(Object.keys(props.formData).length == 0) return console.log("Don't have Form Data");
        let { firstname, lastname, email,electioncode, officertype } = props.formData;

        const model = {
            name : `${firstname} ${lastname}`,
            email, electioncode, officertype
        }

        addMutation.mutate(model)
    }

    if(addMutation.isLoading) return <div>Loading!</div>
    if(addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
    if(addMutation.isSuccess) return <Success message={"Added Successfully"}></Success>
  return (
    <>
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={props.setFormData} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={props.setFormData} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="email" onChange={props.setFormData} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="number" onChange={props.setFormData} name="electioncode" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Election Code" />
            </div>
            <div className="input-type">
                <input type="text" onChange={props.setFormData} name="officertype" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Officer Type" />
            </div>
            <div></div>

            <button className="flex justify-center text-md w-2/6 bg-cyan-800 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-cyan-800 hover:text-cyan-800">
             Add <span className="px-1"><BiPlus size={24}></BiPlus></span>
            </button>

        </form>
    </>
  )
}
