import React, { useEffect, useState } from 'react'
import db from '../db'
import RegisterShort from '../Register/RegisterShort'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

export default function SearchRegistersByCourseSubject() {

    const [subjects, setSubjects] = useState([])
    const [subject, setSubject] = useState("")

    useEffect(() => (async () => setSubjects(await db.Courses.findDistinctSubjects()))(), [])

    const [registers, setRegisters] = useState([])
    useEffect(() => (async () => setRegisters(await db.Registers.findByCourseSubject(subject)))(), [subject])

    return (
        <>
            <h1>Search Registrations By Course Subject</h1>
            <Form.Control as="select" size="sm" onChange={event => setSubject(event.target.value)} value={subject} >
                <option key="" value="" disabled>Select Subject</option>
                {
                    subjects.map(subject =>
                        <option key={subject} value={subject}>{subject}</option>
                    )
                }
            </Form.Control>

            <Table striped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Mark</th>
                        <th></th>
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
        </>
    )
}