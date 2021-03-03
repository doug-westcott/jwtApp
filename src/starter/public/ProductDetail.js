import React, { useEffect, useState } from 'react'
import db from '../../db'
import {
  useParams
} from "react-router-dom";

export default function ProductDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [product, setProduct] = useState(null)
  useEffect(() => (async () => setProduct(await db.Products.findOne(id)))(), [id])

  return (
    product
    &&
    <>
      <h1>Product</h1>
      <dl className="row">
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">{product.name}</dd>
        <dt className="col-sm-3">Price</dt>
        <dd className="col-sm-9">{product.price}</dd>
      </dl>
    </>
  )
}