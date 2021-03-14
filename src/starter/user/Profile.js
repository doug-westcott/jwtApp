import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import db from '../../db';
import Button from 'react-bootstrap/Button';
import UserContext from '../../UserContext'

export default function Profile({ set }) {

  const { user } = useContext(UserContext)

  const handleImage = async event => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      const newName = `UsersPicture${user.id}.${extension}`
      const result = await db.uploadImage(file, newName)
      if (result.ok) {
        await db.Users.update(() => { }, { ...user, picture: `/images/${newName}` })
        set(await db.Users.findOne(user.id))
      }
    }
  }

  const handleEmail = async () => {
    await db.email(user.id, user.name, user.picture)
  }

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
        <dt className="col-sm-3">Picture</dt>
        <dd className="col-sm-9"><img alt="" src={user.picture} height="100" width="100" /></dd>
      </dl>
      <Form.File custom label="Choose new picture" onChange={handleImage} />
      <Button size="sm" variant="light" onClick={handleEmail}>Email Me</Button>
    </>
  )
}