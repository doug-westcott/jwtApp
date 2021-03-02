import React, { useState, useEffect } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function SearchStudentsByBirthdate() {

    const [from, setFrom] = useState(new Date())
    const [to, setTo] = useState(new Date())
    const [students, setStudents] = useState([])
    useEffect(() => (async () => setStudents(await db.Students.findByBirthdateBetween(from, to)))(), [from, to])

    const calculateAge = birthdate =>
        Math.floor((new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

    return (
        <div className="App">
            <header className="App-header">
                <h1>Search Students by Birthdate</h1>
                <Form.Control size="sm" type="date" onChange={event => setFrom(new Date(event.target.value))} placeholder="From" value={from.toISOString().slice(0, 10)} />
                <Form.Control size="sm" type="date" onChange={event => setTo(new Date(event.target.value))} placeholder="From" value={to.toISOString().slice(0, 10)} />

                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age (Birthdate)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(student =>
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td> {`${calculateAge(student.birthdate)} (${student.birthdate.toDateString()})`}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </header>
        </div>
    )
}

export default SearchStudentsByBirthdate