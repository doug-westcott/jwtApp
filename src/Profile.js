import React, { useContext } from 'react';
import UserContext from '../../UserContext'

export default function Profile() {

  const { user } = useContext(UserContext)

  console.log(user)
  return (
    user &&
    <>
      <h1>User ({user.role})</h1>
      <dl className="row">
        <dt className="col-sm-3">Email</dt>
        <dd className="col-sm-9">{user.id}</dd>
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">{user.name}</dd>
      </dl>
    </>
  )
}