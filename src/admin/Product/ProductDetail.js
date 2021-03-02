import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import {
  useParams
} from "react-router-dom";
import RegisterShort from '../Register/RegisterShort'

export default function ProductDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [product, setProduct] = useState(null)
  useEffect(() => (async () => setProduct(await db.Products.findOne(id)))(), [id])

  const [registers, setRegisters] = useState([])
  useEffect(() => (async () => setRegisters(await db.Registers.findByProductid(id)))(), [id])

  console.log('findByProductid', registers)

  return (
    product
    &&
    <div>
      <h1>Product</h1>
      <dl className="row">
        <dt className="col-sm-3">Subject</dt>
        <dd className="col-sm-9">{product.subject}</dd>
        <dt className="col-sm-3">Number</dt>
        <dd className="col-sm-9">{product.number}</dd>
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">{product.name}</dd>
        <dt className="col-sm-3">Price</dt>
        <dd className="col-sm-9">{product.price}</dd>
      </dl>
      <h1>{product.name} students registered</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Student</th>
            <th>Product</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {
            registers.map(register =>
              <RegisterShort key={register.id} register={register} />
            )
          }
        </tbody>
      </Table>
    </div >
  );
}