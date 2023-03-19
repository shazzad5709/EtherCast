import React, { useState } from 'react'
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';
import { useSelector } from "react-redux";
import { useReducer } from "react";
import axios from 'axios';
import { useQuery } from 'react-query';
import { getUsers } from '../../lib/helper';
import Officer from '../../model/Officer';

const formReducer = (state:any, event:any) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

type Props = {}

const index = async (props: Props) => {
  // const [data, setData] = useState(INITIAL_DATA)
  const formId = useSelector((state:any) => state.app.client.formId)
  console.log(formId)
const { isLoading, isError, data, error } = useQuery('users', getUsers)
// const map = new Map(Object.entries(JSON.parse(await getUsers())));
const people = data.map(({ firstName,lastName, email, elCode, role }: Officer) => new Officer(firstName,lastName, email, elCode, role));
console.log(people )

  return (
      <div className="container mx-auto py-5">
        { formId ? <UpdateUserForm  /> : 
  <AddUserForm />}

      </div>
  )
}

export default index