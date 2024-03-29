import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductsPage from "./components/Shop/ProductsPage";
import { useSelector } from "react-redux";
import Addproduct from "./components/seller/ProductAddPage/Addproduct";
import Header from "./components/Header";
import MyProductsPage from "./components/seller/MyProducts/MyProductsPage";
import ProductPage from "./components/ProductPage/ProductPage";
import PurchasePage from "./components/purchasePage/PurchasePage";
import Success from "./components/Success";
import Orders from "./components/Orders/Orders";
import ProfilePage from "./components/profile/ProfilePage";
import Footer from "./components/Footer";
import Dashboard from "./components/seller/Dashboard/Dashboard";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        {/* {user.isLogin && <Header />} */}

        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/profile" element={<ProfilePage />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/shop" element={<ProductsPage />}></Route>
          <Route exact path="/shop/:cateogry" element={<ProductsPage />}></Route>
          <Route
            exact
            path="/seller/addproduct"
            element={<Addproduct />}
          ></Route>
          <Route
            exact
            path="/seller/products"
            element={<MyProductsPage />}
          ></Route>
          <Route
            exact
            path="/seller/editProduct"
            element={<Addproduct />}
          ></Route>
          <Route
            exact
            path="/product/:productId"
            element={<ProductPage/>}
          ></Route>
          <Route
            exact
            path="/purchase/:productId"
            element={<PurchasePage/>}
          ></Route>
          <Route
            exact
            path="/success"
            element={<Success/>}
          ></Route>
          <Route
            exact
            path="/orders"
            element={<Orders/>}
          ></Route>
          <Route 
          exact path="/seller/dashboard"
          element={<Dashboard/>}
          >
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
