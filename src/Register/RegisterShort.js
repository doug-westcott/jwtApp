import React, { useEffect, useState } from 'react'
import db from '../db'

function RegisterShort({ register }) {

    const [student, setStudent] = useState(null)
    useEffect(() => (async () => setStudent(await db.Students.findOne(register.studentid)))(), [register])

    const [course, setCourse] = useState(null)
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
        </tr>
    );
}

export default RegisterShort;
