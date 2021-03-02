import React, { useEffect, useState } from 'react'
import db from '../db'

function RegisterShort({ register }) {

    const [student, setStudent] = useState(null)
    useEffect(() => (async () => setStudent(await db.Students.findOne(register.studentid)))(), [register])

    const [product, setProduct] = useState(null)
    useEffect(() => (async () => setProduct(await db.Products.findOne(register.productid)))(), [register])

    return (
        student
        &&
        product
        &&
        <tr>
            <td>{student.name}</td>
            <td>{product.name}</td>
            <td>{register.mark}</td>
        </tr>
    );
}

export default RegisterShort;
