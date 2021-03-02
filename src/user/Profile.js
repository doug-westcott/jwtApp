import React, { useState, useEffect, useContext } from 'react';
import db from '../db'
import JwtUserContext from '../JwtUserContext'

export default function Profile() {

  const { jwtUser } = useContext(JwtUserContext)

  const [user, setUser] = useState(null)
  useEffect(() => (async () => setUser(await db.Users.findFirstByEmail(jwtUser.username)))(), [jwtUser])

  console.log(user)
  return (
    user &&
    <>
      <h1>User</h1>
      <dl className="row">
        <dt className="col-sm-3">Email</dt>
        <dd className="col-sm-9">{user.email}</dd>
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">{user.name}</dd>
      </dl>
    </>
  )
}