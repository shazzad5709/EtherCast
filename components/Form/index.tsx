import React from 'react'
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';

type Props = {}

const index = (props: Props) => {
    const flag= false;
  return (
    <div className='container mx-auto py-5'>
       { flag ? <AddUserForm /> : <UpdateUserForm />}
    </div>
  )
}

export default index