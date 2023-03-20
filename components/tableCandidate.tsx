import React from 'react'
import { getUsers } from "../lib/helpercan";
import { BiTrashAlt,BiEdit } from 'react-icons/bi'
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, updateAction,  deleteAction } from '../redux/reducer'


export default function Table(){

    const { isLoading, isError, data, error } = useQuery('candidate', getUsers)
    console.log(data+"osjdbgisjgsijg")
    if(isLoading) return <div>Employee is Loading...</div>;
    if(isError) return <div>Got an Error...</div>

  return (
    <>
        <table className="min-w-full table-auto">
            <thead className='text-base text-gray-800 group-hover:text-white font-semibold '>
                <tr className="bg-cyan-800 ">
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Email</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Election Code</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                {
                    data.map((obj:any, i:any) => <Tr {...obj} key={i} />)
                    
                }
            </tbody>
        </table>
    </>
  )
}

function Tr(props:any){
    const visible = useSelector((state:any) => state.app.client.toggleForm)
    const dispatch = useDispatch()
    

    const onUpdate = () => {
        const updatedProps = { ...props, _id: 1 };
        dispatch(toggleChangeAction(props._id))
        if(visible){
            // console.log("hocche kichu")
            dispatch(updateAction(props._id))
        }
      };
      

    const onDelete = () => {
        // console.log("hocche kichuna")
        if(!visible){
            // console.log("hocche kichu")
            dispatch(deleteAction(props.__id))
        }
    }

    return (
        <>
            <tr className="bg-gray-50 text-center ">
                    <td className="px-16 py-2 flex flex-row  items-center">
                        <span className="text-center ml-2 font-semibold">{props.name || 'Unknown'}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span>{props.email || "Unknown"}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span>{props.electioncode || "Unknown"}</span>
                    </td>
                    {/* <td className="px-16 py-2 flex justify-around gap-5">
                        <button className="cursor" onClick={onUpdate}><BiEdit size={25} color={"rgb(0, 131, 143)"}></BiEdit></button>
                        <button className="cursor" onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
                    </td> */}
                </tr>
        </>
    )
}

// export default table