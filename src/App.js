import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { onError } from '@apollo/client/link/error'
import Navbar from './components/Navbar';
import Products from './components/Products';
import SingleProductPage from './components/SingleProductPage';
import Cart from './components/cart/Cart';
import MiniCart from './components/cart/MiniCart';





function App() {
  return (
    <Router>
      <Navbar />
      <MiniCart />
      <Routes>
        <Route exact path="/" element={<Products />}></Route>
        <Route exact path="/product/:id" element={<SingleProductPage />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
