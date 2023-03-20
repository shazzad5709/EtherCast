import React, { FormEvent } from "react";
import { useReducer, useState, useEffect } from "react";
import { BiBrush, BiUser, BiIdCard } from "react-icons/bi";
import { AiOutlineMail, AiFillCodeSandboxCircle } from "react-icons/ai";
import axios from "axios";
import Router from 'next/router'
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUser, getUsers, updateUser } from "../../lib/helper";


  export default function UpdateUserForm({formId,formData,setData}:any) {
    const [fdata,setFdata] = useState<any>({})
    const fetchData = async () => {
      // e.preventDefault()
      await axios.get(`/api/users/${formId}`)
      .then(res => {
        // console.log(res.data)
        const data = JSON.stringify(res.data)
        let parsedMap = JSON.parse(data)
        setFdata(parsedMap)
        // return res.data
      })
      .catch(err => {
        console.log(err)
      })
    }
    
    
    const queryClient = useQueryClient()
    // const data = findUser()
    // console.log(data+"sdhgiausdgh")
    // const {isLoading, isError, data, error} = useQuery(['users', formId], () => getUser(formId))
    // const {fdata}:any = fetchData()
   
    console.log(fdata)

    const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
         onSuccess : async (data) => {
             // queryClient.setQueryData('users', (old) => [data])
             queryClient.prefetchQuery('user', getUsers)
         }
     })
    // useEffect(() => {
    //   // Fetch the current user data and pre-populate the form fields
    //   const fetchUserData = async () => {
    //     // console.log(props.email)
    //     try {
    //       const res = await axios.get('/api/users/updateOfficer/');
    //       setData(res.data);
    //       // console.log((data))
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   fetchUserData();
    // }, []);


  
    // function updateFields(fields: Partial<FormData>) {
    //   setData(prev => {
    //     return { ...prev, ...fields }
    //   });
    // } 
  
    // const updateUser = async () => {
    //   try {
    //     const res = await axios.put(
    //       `/api/users/updateOfficer/`,
    //       {
    //         data
    //       },
    //       {
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //         }
    //       }
    //     );
    //     Router.reload();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
   
    const name = fdata.name
    const electioncode = fdata.electioncode
    const email = fdata.email
    const role = fdata.officertype
    // const name = parsedMap.name
     const [firstname, lastname] = name ? name.split(' ') : []
  
    function onSubmit(e: FormEvent) {
      e.preventDefault();
  
      // return updateUser();
    }


  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="inline-flex space-x-4">
          <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <BiUser className="text-gray-400 m-2" />
            <input
              required
              className="bg-gray-100 flex-1 outline-none"
              type="text"
              name="firstname"
              placeholder="First Name"
              defaultValue={firstname}
              // value={data.firstname}
                //  onChange={e => updateFields({firstname: e.target.value})}
            />
          </div>
          <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <BiUser className="text-gray-400 m-2" />
            <input
              required
              className="bg-gray-100 flex-1 outline-none"
              type="text"
              name="lastname"
              placeholder="Last Name"
              defaultValue={lastname}
              // value={data.lastname}
                // onChange={e => updateFields({lastname: e.target.value})}
            />
          </div>
        </div>
        <br />
        <div className="inline-flex space-x-4">
          <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <AiOutlineMail className="text-gray-400 m-2" />
            <input
              required
              className="bg-gray-100 flex-1 outline-none"
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={email}
              // value={data.email}
              // onChange={e => updateFields({email: e.target.value})}
            />
          </div>
          <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <BiIdCard className="text-gray-400 m-2" />
            <input
              required
              className="bg-gray-100 flex-1 outline-none"
              type="text"
              name="role"
              placeholder="Role"
              defaultValue={role}
              // value={data.role}
                // onChange={e => updateFields({role: e.target.value})}
            />
          </div>
        </div>
        <br />
        <div className="inline-flex space-x-4">
          <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <AiFillCodeSandboxCircle className="text-gray-400 m-2" />
            <input
              required
              className="bg-gray-100 flex-1 outline-none"
              type="number"
              name="elCode"
              placeholder="Election Code"
              defaultValue={electioncode}
              // value={data.elCode}
                // onChange={e => updateFields({elCode: e.target.value})}
            />
          </div>
        </div>
        <br />
        <div className="inline-flex space-x-4">
          <button 
            type="submit"
            className="border-2 tracking-[2px] border-cyan-800 mb-2 mt-4 rounded-full px-8 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white">
            Update
          </button>
        </div>
      </form>
    </>
  );
}
