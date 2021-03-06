import React, { useEffect, useState } from 'react'
import db from '../../../../db'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Product from './Product'

export default function Products() {

  const [products, setProducts] = useState([])
  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)

  useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

  const create = async () => {
    await db.Products.create(setProducts, { name, price })
    setId(0)
    setName("")
    setPrice(0)
  }

  const remove = async id => await db.Products.remove(setProducts, id)

  const edit = async id => {
    const product = await db.Products.findOne(id)
    setId(product.id)
    setName(product.name)
    setPrice(product.price)
  }

  // update is step 2
  const update = async () => {
    await db.Products.update(setProducts, { id, name, price })
    setId(0)
    setName("")
    setPrice(0)
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => setValidCreate(
    name !== "" &&
    price > 0
  ), [name, price])

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    name !== "" &&
    id > 0 &&
    price > 0 &&
    await db.Products.findOne(id) !== undefined
  ))(), [id, name, price])

  return (
    <div>
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
          <tr>
            <td>
              <Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} placeholder="Name" value={name} />
            </td>
            <td>
              <Form.Control size="sm" type="number" onChange={event => setPrice(1 * event.target.value)} placeholder="Price" value={price} />
            </td>
            <td>
              <Button size="sm" variant="light" onClick={create} disabled={!validCreate}>Create</Button>
              <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>
            </td>
          </tr>
          {
            products.map(product =>
              <Product key={product.id} product={product} edit={edit} remove={remove} />
            )
          }
        </tbody>
      </Table>
    </div >
  );
}