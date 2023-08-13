import React from 'react'
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import Profile from './components/profile/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductsPage from './components/ProductStore/ProductsPage';
import { useSelector } from 'react-redux';
import Addproduct from './components/seller/ProductAddPage/Addproduct';

function App() {
  const user = useSelector(state=>state.user)
  
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route exact path='/' element={
        <Home/>
      }/>
      <Route exact path='/cart' element={
      <Cart/>
      }></Route>
      <Route exact path='/profile' element={
      <Profile/>
      }></Route>
      <Route exact path='/login' element={
      <Login/>
      }></Route>
      <Route exact path='/signup' element={
      <Signup/>
      }></Route>
      <Route exact path='/products' element={
      <ProductsPage/>
      }></Route>
      <Route exact path='/seller/addProduct' element={<Addproduct/>}>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
