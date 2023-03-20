import React, { useReducer } from 'react'
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';
import { useSelector } from "react-redux";

const formReducer = (state:any, event:any) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

type Props = {}

const index = (props: Props) => {
  const [formData, setFormData] = useReducer(formReducer, {})
  const formId = useSelector((state:any) => state.app.client.formId)
  console.log(formId)

  return (
      <div className="container mx-auto py-5">
        { formId ? <UpdateUserForm formId={formId} formData={formData} setFormData={setFormData} /> :  <AddUserForm />}

      </div>
  )
}

export default index