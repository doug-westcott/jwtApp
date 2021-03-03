import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Register from './Register'

export default function Registers() {

    const [students, setStudents] = useState([])
    const [products, setProducts] = useState([])
    const [registers, setRegisters] = useState([])
    const [id, setId] = useState(0)
    const [mark, setMark] = useState(-1)
    const [studentid, setStudentid] = useState(0)
    const [productid, setProductid] = useState(0)

    // in React useEffect does initialization
    useEffect(() => (async () => setRegisters(await db.Registers.findAll()))(), [])
    useEffect(() => (async () => setStudents(await db.Students.findAll()))(), [])
    useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

    const create = async () => {
        await db.Registers.create(setRegisters, { mark, studentid, productid })
        setId(0)
        setMark(-1)
        setStudentid(0)
        setProductid(0)
    }

    const remove = async id => await db.Registers.remove(setRegisters, id)

    // edit is step 1
    const edit = async id => {
        const register = await db.Registers.findOne(id)
        setId(register.id)
        setMark(register.mark)
        setStudentid(register.studentid)
        setProductid(register.productid)
    }

    // update is step 2
    const update = async () => {
        await db.Registers.update(setRegisters, { id, mark, studentid, productid })
        setId(0)
        setMark(-1)
        setStudentid(0)
        setProductid(0)
    }

    const [validCreate, setValidCreate] = useState(false)
    useEffect(() => (async () => {
        const product = productid > 0 && await db.Products.findOne(productid)
        setValidCreate(
            //mark >= -1 &&
            studentid > 0 &&
            productid > 0 &&
            await db.Students.findOne(studentid) !== undefined &&
            product !== undefined &&
            product.price > registers.filter(register => register.productid === productid).length &&
            (await db.Registers.findByStudentidAndProductid(studentid, productid)).length === 0
    )
    })(), [mark, studentid, productid, registers])

    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
        id > 0 &&
        mark >= -1 &&
        studentid > 0 &&
        productid > 0 &&
        await db.Students.findOne(studentid) !== undefined &&
        await db.Products.findOne(productid) !== undefined
    ))(), [id, mark, studentid, productid])

    return (
        <div>
            <h1>Registrations</h1>
            <Table striped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Product</th>
                        <th>Mark</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control as="select" size="sm" value={studentid} placeholder="Student" onChange={event => setStudentid(1 * event.target.value)}>
                                <option key={0} value={0} disabled>Select Student</option>
                                {
                                    students.map(student =>
                                        <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                                    )
                                }
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control as="select" size="sm" value={productid} placeholder="Product" onChange={event => setProductid(1 * event.target.value)}>
                                <option key={0} value={0} disabled>Select Product</option>
                                {
                                    products.map(product =>
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    )
                                }
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control size="sm" type="number" onChange={event => setMark(1 * event.target.value)} placeholder="Mark" value={mark} />
                        </td>
                        <td>
                            <Button size="sm" variant="light" onClick={create} disabled={!validCreate}>Create</Button>
                            <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>
                        </td>
                    </tr>
                    {
                        registers.map(register =>
                            <Register key={register.id} register={register} edit={edit} remove={remove} />
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}