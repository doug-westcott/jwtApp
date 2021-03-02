import React, { useEffect, useState } from 'react'
import db from '../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Product({ product, edit, remove }) {

  const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Registers.findByProductid(product.id)).length === 0
  ))(), [product])

  return (
    <tr>
      <td>{product.subject}</td>
      <td>{product.number}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <Button size="sm" variant="light" onClick={() => remove(product.id)} disabled={!validRemove}>X</Button>
        <Button size="sm" variant="light" onClick={() => edit(product.id)}>Edit</Button>
        <Button size="sm" variant="link" as={Link} to={`/productdetail/${product.id}`}>Details</Button>
      </td>
    </tr>
  )
}

export default Product;
