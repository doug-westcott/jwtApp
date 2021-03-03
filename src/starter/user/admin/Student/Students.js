import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Student from './Student'

function Students() {

  const [students, setStudents] = useState([])
  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState(new Date())
  const [picture, setPicture] = useState("")

  useEffect(() => (async () => setStudents(await db.Students.findAll()))(), [])

  const create = async () => {
    await db.Students.create(setStudents, { id, name, birthdate, picture })
    setId(0)
    setName("")
    setBirthdate(new Date())
    setPicture("")
  }

  const remove = async id => await db.Students.remove(setStudents, id)

  // edit is step 1
  const edit = async id => {
    const student = await db.Students.findOne(id)
    setId(student.id)
    setName(student.name)
    setBirthdate(student.birthdate)
    setPicture(student.picture)
  }

  // update is step 2
  const update = async () => {
    await db.Students.update(setStudents, { id, name, birthdate, picture })
    setId(0)
    setName("")
    setBirthdate(new Date())
    setPicture("")
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => (async () => setValidCreate(
    name !== "" &&
    birthdate <= new Date() &&
    picture !== "" &&
    id > 0 &&
    await db.Students.findOne(id) === undefined
  ))(), [id, name, birthdate, picture])

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    name !== "" &&
    birthdate <= new Date() &&
    picture !== "" &&
    id > 0 &&
    await db.Students.findOne(id) !== undefined
  ))(), [id, name, birthdate, picture])

  // console.log(students)

  return (
    <div>
      <h1>Students</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age (Birthdate)</th>
            <th>Picture</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control size="sm" type="number" onChange={event => setId(1 * event.target.value)} placeholder="Id" value={id} />
            </td>
            <td>
              <Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} placeholder="Name" value={name} />
            </td>
            <td>
              <Form.Control size="sm" type="date" onChange={event => setBirthdate(event.target.value ? new Date(event.target.value) : null)} placeholder="Birthdate" value={birthdate ? birthdate.toISOString().slice(0, 10) : ""} />
            </td>
            <td>
              <Form.Control size="sm" type="text" onChange={event => setPicture(event.target.value)} placeholder="Picture" value={picture} />
            </td>
            <td>
              <Button size="sm" variant="light" onClick={create} disabled={!validCreate}>Create</Button>
              <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>
            </td>
          </tr>
          {
            students.map(student =>
              <Student key={student.id} student={student} edit={edit} remove={remove} />
            )
          }
        </tbody>
      </Table>
    </div >
  );
}

export default Students;
