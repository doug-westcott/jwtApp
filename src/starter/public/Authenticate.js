import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";

export default function Authenticate({ type, set }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    const handleAuthenticate = async () => {
        const response = await fetch(
            `${type.toLowerCase()}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        )
        let jwtUser = null
        if (response.ok) {
            jwtUser = await response.json()
            if (jwtUser) {
                set(jwtUser)
                history.push("/")
            }
        } else {
            console.log('response not ok', response)
        }
    }

    const [validAuthenticate, setValidAuthenticate] = useState(false)
    useEffect(() => setValidAuthenticate(
        username !== "" &&
        password !== ""
    ), [username, password])

    return (
        <>
            <h1>{type}</h1>
            <Form.Control size="sm" type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} value={username} />
            <Form.Control size="sm" type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} value={password} />
            <Button size="sm" variant="light" onClick={handleAuthenticate} disabled={!validAuthenticate}>{type}</Button>
        </>
    )

}