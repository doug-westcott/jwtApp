import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import RegisterShort from './RegisterShort'

export default function RegisterDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [register, setRegister] = useState(null)
  useEffect(() => (async () => setRegister(await db.Registers.findOne(id)))(), [id])

  const [student, setStudent] = useState(null)
  useEffect(() => (async () => register && setStudent(await db.Students.findOne(register.studentid)))(), [register])

  const [product, setProduct] = useState(null)
  useEffect(() => (async () => register && setProduct(await db.Products.findOne(register.productid)))(), [register])

  const [studentRegisters, setStudentRegisters] = useState([])
  useEffect(() => (async () => register && setStudentRegisters(await db.Registers.findByStudentid(register.studentid)))(), [register])

  const [productRegisters, setProductRegisters] = useState([])
  useEffect(() => (async () => register && setProductRegisters(await db.Registers.findByProductid(register.productid)))(), [register])

  return (
    register
    &&
    student
    &&
    product
    &&
    <>
      <h1>Registration Details</h1>
      <dl className="row">
        <dt className="col-sm-3">Student</dt>
        <dd className="col-sm-9">{student.name}</dd>
        <dt className="col-sm-3">Product</dt>
        <dd className="col-sm-9">{product.name}</dd>
        <dt className="col-sm-3">Mark</dt>
        <dd className="col-sm-9">{register.mark}</dd>
      </dl>
      <h1>{student.name} also registered in</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Student</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {
            studentRegisters
              .filter(register => register.id !== id)
              .map(register =>
                <RegisterShort key={register.id} register={register} />
              )
          }
        </tbody>
      </Table>
      <h1>Others also registered in {product.name}</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Student</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {
            productRegisters
              .filter(register => register.id !== id)
              .map(register =>
                <RegisterShort key={register.id} register={register} />
              )
          }
        </tbody>
      </Table>
    </>
  )
}