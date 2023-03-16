import React from 'react'
import { BiEdit, BiTrashAlt } from "react-icons/bi";
type Props = {}

const table = (props: Props) => {
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
                        <span className="text-gray-200">Status</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                <tr className="bg-gray-50 text-center ">
                    <td className="px-16 py-2 flex flex-row  items-center">
                        <span className="text-center ml-2 font-semibold">Daily Tuition</span>
                    </td>
                    <td className="px-16 py-2">
                        <span>dailytuition@gmail.com</span>
                    </td>
                    <td className="px-16 py-2">
                        <button className="cursor"><span className="bg-cyan-800 text-white px-5 py-1 rounded-full">Active</span></button>
                    </td>
                    <td className="px-16 py-2 flex justify-around gap-5">
                        <button className="cursor"><BiEdit size={25} color={"rgb(0, 131, 143)"}></BiEdit></button>
                        <button className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default table