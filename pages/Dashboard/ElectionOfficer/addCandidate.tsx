import React, { useState } from "react";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import Navbar from "../../../components/OldOnes/navbar2";
import Table from "../../../components/OldOnes/tableCandidate";
import Form from "../../../components/Form/AddCandidate";
import { useSelector, useDispatch  } from 'react-redux';
import { toggleChangeAction, deleteAction } from '../../../redux/reducer';
import { deleteUser, getUsers } from '../../../lib/helpercan';
import { useQueryClient } from 'react-query';

type Props = {};

const AddElecOff = (props: Props) => {
  const visible = useSelector((state:any) => state.app.client.toggleForm)
  const deleteId = useSelector((state:any)=> state.app.client.deleteId)
  const queryclient = useQueryClient();

  const dispatch = useDispatch()

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  const deletehandler =  async () => {
    if(deleteId){
      await deleteUser(deleteId);
      await queryclient.prefetchQuery('candidate', getUsers)
      await dispatch(deleteAction(null))
    }
  }

  const canclehandler = async () => {
    console.log("cancel")
    await dispatch(deleteAction(null))
  }
  return (
    <>
      <div>
        <div className="dark:bg-zinc-800 [&>*]:leading-[1.6]">
          <Navbar />
          <div
            className="min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-60"
            id="content">
            <div className="py-12 text-center">
              <div
                className="min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-24"
                id="content">
                <div className="container mx-auto flex justify-between py-5 border-b">
                  <div className="left flex gap-3">
                    <div className="flex mb-2 mx-4 my-10 justify-start items-center gap-4 pl-5 hover:bg-cyan-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <BiUserPlus className="text-2xl text-gray-600 group-hover:text-white " />
                      <button
                        onClick={handler}
                        className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Add Candidates
                      </button>
                    </div>
                  </div>
                  { deleteId ? DeleteComponent({ deletehandler, canclehandler }) : <></>}
                </div>
                <div className="container mx-auto py-5">
                  {visible ? <Form /> : <></>}
                </div>
                <br />
                <div className="container mx-auto">
                  <Table />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddElecOff;

function DeleteComponent(props:any){
  return (
    <div className='flex gap-5'>
        <button>Are you sure?</button>
        <button onClick={props.deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
          Yes <span className='px-1'><BiX color='rgb(255 255 255)' size={25} /></span></button>
        <button onClick={props.canclehandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50'>
          No <span className='px-1'><BiCheck color='rgb(255 255 255)' size={25} /></span></button>
    </div>
  )
}
