import React, { useState, useEffect } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const calculateAge = birthdate =>
Math.floor((new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

function SearchStudentsByName() {

    const [name, setName] = useState("")
    const [students, setStudents] = useState([])
    useEffect(() => (async () => setStudents(await db.Students.findByNameContaining(name)))(), [name])

    return (
        <div className="App">
            <header className="App-header">
                <h1>Search Students by Name</h1>
                <Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} placeholder="Name" value={name} />
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

export default SearchStudentsByName