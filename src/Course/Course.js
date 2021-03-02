import React, { useEffect, useState } from 'react'
import db from '../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Course({ course, edit, remove }) {

  const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Registers.findByCourseid(course.id)).length === 0
  ))(), [course])

  return (
    <tr>
      <td>{course.subject}</td>
      <td>{course.number}</td>
      <td>{course.title}</td>
      <td>{course.capacity}</td>
      <td>
        <Button size="sm" variant="light" onClick={() => remove(course.id)} disabled={!validRemove}>X</Button>
        <Button size="sm" variant="light" onClick={() => edit(course.id)}>Edit</Button>
        <Button size="sm" variant="link" as={Link} to={`/coursedetail/${course.id}`}>Details</Button>
      </td>
    </tr>
  )
}

export default Course;
