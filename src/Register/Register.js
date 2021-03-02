import React, { useEffect, useState } from 'react'
import db from '../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function Register({ register, remove, edit }) {

    const [student, setStudent] = useState(null)
    const [course, setCourse] = useState(null)

    useEffect(() => (async () => setStudent(await db.Students.findOne(register.studentid)))(), [register])
    useEffect(() => (async () => setCourse(await db.Courses.findOne(register.courseid)))(), [register])

    return (
        student
        &&
        course
        &&
        <tr>
            <td>{student.name}</td>
            <td>{course.title}</td>
            <td>{register.mark}</td>
            <td>
                <Button size="sm" variant="light" onClick={() => remove(register.id)}>X</Button>
                <Button size="sm" variant="light" onClick={() => edit(register.id)}>Edit</Button>
                <Button size="sm" variant="link" as={Link} to={`/registerdetail/${register.id}`}>Details</Button>
            </td>
        </tr>
    );
}