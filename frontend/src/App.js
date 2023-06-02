import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useThemeHook } from './GlobalComponents/ThemeProvider';
import Header from './components/Header';



//Pages
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import ProductDetails from "./Pages/ProductDetails";
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import MyAccount from "./Pages/MyAccount";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

function App() {
  const [theme] = useThemeHook();
  return (
    <Router>
      <Header />
      <div className="App">
        <main className={theme ? 'bg-black' : 'bg-light-2'} style={{ height: '100vh', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="product-details/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
