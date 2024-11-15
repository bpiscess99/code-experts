import React, { useEffect, useState } from 'react'

const Cart = () => {
const [cartItem, setCartItem] = useState([]);

useEffect(() => {
  const cartData = JSON.parse(localStorage.getItem("cart") || "[]")
  setCartItem(cartData);
}, []);

const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItem([])
    alert("cart cleared")
}


  return (
    <div>
        <h2>Cart</h2>
        {cartItem.length === 0 ? (
            <p>Cart is empty</p>
        ): (
            <div>
                <ul>
                {cartItem.map((cart, index) => (
                <li key={index}>
                   <h4>{cart.title}</h4>
                   <p>{cart.price}</p>
                </li>
                ))}
                </ul>
                <button onClick={clearCart}>Clear Cart</button>
            </div>
        )}
    </div>

  )
}

export default Cart