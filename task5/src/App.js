import './App.css';
import Cart from './components/Cart';
import Product from './components/Product';
import ProductList from './components/ProductList';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
    <>
    <Router>
     <Routes>
      <Route path='/' element={<Product/>}/>
      <Route path='/productList' element={<ProductList/>}/>
      <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
