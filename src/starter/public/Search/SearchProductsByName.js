import React, { useState, useEffect } from 'react'
import db from '../../../db'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Product from '../Product'

export default function SearchProductsByName() {

    const [name, setName] = useState("")
    const [products, setProducts] = useState([])
    useEffect(() => (async () => setProducts(await db.Products.findByNameContaining(name)))(), [name])

    return (
        <>
            <h1>Search Products by Name</h1>
            <Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} placeholder="Name" value={name} />
            <Table striped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => <Product key={product.id} product={product} />)
                    }
                </tbody>
            </Table>
        </>
    )
}