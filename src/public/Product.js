import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function Product({ product }) {

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <Button size="sm" variant="link" as={Link} to={`/productdetail/${product.id}`}>Details</Button>
      </td>
    </tr>
  )
}