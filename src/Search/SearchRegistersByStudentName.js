import React, { useState, useEffect } from 'react'
import db from '../db'
import RegisterShort from '../Register/RegisterShort'

function SearchRegistersByStudentName() {

    const [name, setName] = useState("")

    const [registers, setRegisters] = useState([])
    useEffect(() => (async () => setRegisters(await db.Registers.findByStudentNameContaining(name)))(), [name])

    // console.log(registers)
    return (
        <div className="App">
            <header className="App-header">
                <h1>Search Registers By Student Name</h1>
                <input type="text" onChange={event => setName(event.target.value)} placeholder="Name" value={name} />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registers.map(register =>
                                <RegisterShort key={register.id} register={register} />
                            )
                        }
                    </tbody>
                </table>
            </header>
        </div>
    )
}

export default SearchRegistersByStudentName