import React, { useReducer } from 'react'
import AddUserForm from './AddVoter';
import { useSelector } from "react-redux";
import axios from 'axios';

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
        <AddUserForm />
      </div>
  )
}

export default index