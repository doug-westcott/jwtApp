import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import Product from './Product'

export default function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

  return (
    <>
      <h1>Products</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th></th>
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