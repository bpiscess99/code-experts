import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Product.css"
import { useNavigate } from 'react-router-dom';



const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const navigate = useNavigate();
   
    // product fetching through API
    const fetchProducts = async () =>{
        try {
          const response = await axios.get("https://dummyjson.com/products?limit=10");
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
        } catch (error) {
          console.log("fetching error", error)
        }
      };
      
      useEffect(() => {
        fetchProducts()
      }, []);

    //   Filtered Products
    useEffect(() => {
      setFilteredProducts(
        products.filter(product => product.title.toLowerCase().includes(searchItem.toLowerCase()))
      )
    }, [searchItem, products])

    // Add to Cart
    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart)) ;
    alert("Product added to cart!");
    }
    

  return (
    <div>
        <input
        type='text'
        placeholder='Search Products'
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        />
        <div>
            <button onClick={() => navigate("/cart")}>Go to Cart</button>
        </div>
        <div className='product-map'>
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <h3>{product.title}</h3>
                <img src={product.images} alt={product} width="120"/>
               <strong> <span>{product.brand}</span> </strong> 
               <br/>
                <span>{product.category}</span>
                <p>{product.price}</p>
                <button onClick={() => addToCart(product)}>Add To Cart</button>
              </div>
            ))}
        </div>
    </div>
  )
}

export default ProductList