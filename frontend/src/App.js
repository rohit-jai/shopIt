
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'


import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './actions/userActions'
import store from './store'
import { useEffect } from 'react';


function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container contariner-fluid'>
          <Routes>
            <Route path="/" element={<Home />} exact ></Route>
            <Route path="/search/:keyword" element={<Home />} ></Route>
            <Route path="/product/:id" element={<ProductDetails />} exact ></Route>


            <Route path="/login" element={<Login />} ></Route>
            <Route path="/register" element={<Register />} ></Route>
          </Routes>
        </div>
        <Footer />
      </div>

    </Router>

  );
}

export default App;
