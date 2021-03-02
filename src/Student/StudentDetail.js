import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import {
  useParams
} from "react-router-dom";
import RegisterShort from '../Register/RegisterShort'

const calculateAge = birthdate =>
  Math.floor((new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

export default function StudentDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [student, setStudent] = useState(null)
  useEffect(() => (async () => setStudent(await db.Students.findOne(id)))(), [id])

  const [registers, setRegisters] = useState([])
  useEffect(() => (async () => setRegisters(await db.Registers.findByStudentid(id)))(), [id])

  console.log('findByStudentid', registers)

  return (
    student
    &&
    <div>
      <h1>Student</h1>
      <dl className="row">
        <dt className="col-sm-3">Id</dt>
        <dd className="col-sm-9">{student.id}</dd>
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">{student.name}</dd>
        <dt className="col-sm-3">Age (Birthdate)</dt>
        <dd className="col-sm-9">{`${calculateAge(student.birthdate)} (${student.birthdate.toDateString()})`}</dd>
        <dt className="col-sm-3">Picture</dt>
        <dd className="col-sm-9"><img alt="" height="50" width="50" src={student.picture} /></dd>
      </dl>
      <h1>{student.name} is registered in</h1>
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