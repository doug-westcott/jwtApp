import React, { useEffect, useState } from 'react'
import db from '../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const calculateAge = birthdate =>
  Math.floor((new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

function Student({ student, edit, remove }) {

  const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Registers.findByStudentid(student.id)).length === 0
  ))(), [student])

  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td> {`${calculateAge(student.birthdate)} (${student.birthdate.toDateString()})`}</td>
      <td><img alt="" height="50" width="50" src={student.picture}/></td>
      <td>
        <Button size="sm" variant="light" onClick={() => remove(student.id)} disabled={!validRemove}>X</Button>
        <Button size="sm" variant="light" onClick={() => edit(student.id)}>Edit</Button>
        <Button size="sm" variant="link" as={Link} to={`/studentdetail/${student.id}`}>Details</Button>
      </td>
    </tr>
  );
}

export default Student;
