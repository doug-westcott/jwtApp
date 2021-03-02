import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Course from './Course'

export default function Courses() {

  const [courses, setCourses] = useState([])
  const [id, setId] = useState(0)
  const [subject, setSubject] = useState("")
  const [number, setNumber] = useState(0)
  const [title, setTitle] = useState("")
  const [capacity, setCapacity] = useState(0)

  useEffect(() => (async () => setCourses(await db.Courses.findAll()))(), [])

  const create = async () => {
    await db.Courses.create(setCourses, { subject, number, title, capacity })
    setId(0)
    setSubject("")
    setNumber(0)
    setTitle("")
    setCapacity(0)
  }

  const remove = async id => await db.Courses.remove(setCourses, id)

  // edit is step 1
  const edit = async id => {
    const course = await db.Courses.findOne(id)
    setId(course.id)
    setSubject(course.subject)
    setNumber(course.number)
    setTitle(course.title)
    setCapacity(course.capacity)
  }

  // update is step 2
  const update = async () => {
    await db.Courses.update(setCourses, { id, subject, number, title, capacity })
    setId(0)
    setSubject("")
    setNumber(0)
    setTitle("")
    setCapacity(0)
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => setValidCreate(
    subject !== "" &&
    subject.length === 2 &&
    number > 0 &&
    number <= 9999 &&
    title !== "" &&
    capacity > 0
  ), [subject, number, title, capacity])

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    subject !== "" &&
    subject.length === 2 &&
    number > 0 &&
    number <= 9999 &&
    title !== "" &&
    id > 0 &&
    capacity > 0 &&
    await db.Courses.findOne(id) !== undefined
  ))(), [id, subject, number, title, capacity])

  // console.log(courses)

  return (
    <div>
      <h1>Courses</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Number</th>
            <th>Title</th>
            <th>Capacity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control size="sm" title="text" onChange={event => setSubject(event.target.value)} placeholder="Subject" value={subject} />
            </td>
            <td>
              <Form.Control size="sm" title="number" onChange={event => setNumber(1 * event.target.value)} placeholder="Number" value={number} />
            </td>
            <td>
              <Form.Control size="sm" title="text" onChange={event => setTitle(event.target.value)} placeholder="Title" value={title} />
            </td>
            <td>
              <Form.Control size="sm" title="number" onChange={event => setCapacity(1 * event.target.value)} placeholder="Capacity" value={capacity} />
            </td>
            <td>
              <Button size="sm" variant="light" onClick={create} disabled={!validCreate}>Create</Button>
              <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>
            </td>
          </tr>
          {
            courses.map(course =>
              <Course key={course.id} course={course} edit={edit} remove={remove} />
            )
          }
        </tbody>
      </Table>
    </div >
  );
}