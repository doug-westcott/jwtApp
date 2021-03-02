import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import {
  useParams
} from "react-router-dom";
import RegisterShort from '../Register/RegisterShort'

export default function CourseDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [course, setCourse] = useState(null)
  useEffect(() => (async () => setCourse(await db.Courses.findOne(id)))(), [id])

  const [registers, setRegisters] = useState([])
  useEffect(() => (async () => setRegisters(await db.Registers.findByCourseid(id)))(), [id])

  console.log('findByCourseid', registers)

  return (
    course
    &&
    <div>
      <h1>Course</h1>
      <dl className="row">
        <dt className="col-sm-3">Subject</dt>
        <dd className="col-sm-9">{course.subject}</dd>
        <dt className="col-sm-3">Number</dt>
        <dd className="col-sm-9">{course.number}</dd>
        <dt className="col-sm-3">Title</dt>
        <dd className="col-sm-9">{course.title}</dd>
        <dt className="col-sm-3">Capacity</dt>
        <dd className="col-sm-9">{course.capacity}</dd>
      </dl>
      <h1>{course.title} students registered</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {
            registers.map(register =>
              <RegisterShort key={register.id} register={register} />
            )
          }
        </tbody>
      </Table>
    </div >
  );
}