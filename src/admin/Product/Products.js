import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Product from './Product'

export default function Products() {

  const [products, setProducts] = useState([])
  const [id, setId] = useState(0)
  const [subject, setSubject] = useState("")
  const [number, setNumber] = useState(0)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)

  useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

  const create = async () => {
    await db.Products.create(setProducts, { subject, number, name, price })
    setId(0)
    setSubject("")
    setNumber(0)
    setName("")
    setPrice(0)
  }

  const remove = async id => await db.Products.remove(setProducts, id)

  // edit is step 1
  const edit = async id => {
    const product = await db.Products.findOne(id)
    setId(product.id)
    setSubject(product.subject)
    setNumber(product.number)
    setName(product.name)
    setPrice(product.price)
  }

  // update is step 2
  const update = async () => {
    await db.Products.update(setProducts, { id, subject, number, name, price })
    setId(0)
    setSubject("")
    setNumber(0)
    setName("")
    setPrice(0)
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => setValidCreate(
    subject !== "" &&
    subject.length === 2 &&
    number > 0 &&
    number <= 9999 &&
    name !== "" &&
    price > 0
  ), [subject, number, name, price])

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    subject !== "" &&
    subject.length === 2 &&
    number > 0 &&
    number <= 9999 &&
    name !== "" &&
    id > 0 &&
    price > 0 &&
    await db.Products.findOne(id) !== undefined
  ))(), [id, subject, number, name, price])

  // console.log(products)

  return (
    <div>
      <h1>Products</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Number</th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control size="sm" type="text" onChange={event => setSubject(event.target.value)} placeholder="Subject" value={subject} />
            </td>
            <td>
              <Form.Control size="sm" type="number" onChange={event => setNumber(1 * event.target.value)} placeholder="Number" value={number} />
            </td>
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