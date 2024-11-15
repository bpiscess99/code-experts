import React from 'react'
import { useNavigate } from 'react-router-dom'

const Product = () => {
    const navigate = useNavigate();

  return (
    <div>
        <h1>Product Store</h1>
        <button onClick={() => navigate("/productList")}>Go To Product List</button>
    </div>
  )
}

export default Product