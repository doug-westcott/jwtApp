const authenticate = async (type, username, password) => {
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
    if (response.ok) {
        const jwtUser = await response.json()
        return jwtUser
    } else {
        console.log('response not ok', response)
    }
}

export default authenticate