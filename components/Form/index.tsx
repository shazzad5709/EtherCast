import React from 'react'
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state:any, event:any) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

type Props = {}

const index = (props: Props) => {
  const [formData, setFormData] = useReducer(formReducer, {})
//   const formId = useSelector((state:any) => state.app.client.formId)

  return (
      <div className="container mx-auto py-5">
          <AddUserForm />
      </div>
  )
}

export default index