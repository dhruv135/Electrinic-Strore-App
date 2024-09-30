import { BrowserRouter, Route, Routes } from "react-router-dom";

import Carriers from "./components/Carriers";
import Contact from "./components/Contact";
import Product from "./components/Product";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Services from "./components/Services";
import { toast, ToastContainer, Zoom } from "react-toastify";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/users/DashBoard";
import UserProvider from "./context/user.provider";
import Home from "./pages/users/Home";
import Main from "./components/Main";
import AboutUser from "./pages/users/AboutUser";
import Profile from "./pages/users/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHomeGraph from "./pages/admin/AdminHomeGraph";
import AddProducts from "./pages/admin/AddProducts";
import AddCategory from "./pages/admin/AddCategory";
import ViewCategories from "./pages/admin/ViewCategories";
import ViewProducts from "./pages/admin/ViewProducts";
import Orders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/AdminUsers";
import "./App.css";
import StorePage from "./pages/users/StorePage";
import ProductView from "./pages/users/ProductView";
import CategoryStorePage from "./components/user/CategoryStorePage";
import Cart from "./components/Cart";
import CartProvider from "./context/CartProvider";
import UserOrders from "./components/user/UserOrders";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";
import { privateAxois } from "./Service/axios.service";
import useLoader from "./hooks/useLoader";
import PracticeFooter from "./components/PracticeFooter";
function App() {
  const loa = useLoader();

  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastContainer
            position="bottom-center"
            transition={Zoom}
          ></ToastContainer>
          <NavBar></NavBar>
          <Loading show={loa}></Loading>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Product />} />
            <Route path="/carriers" element={<Carriers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/orders" element={<UserOrders />}></Route>

            <Route
              path="/store/productView/:productId"
              element={<ProductView />}
            />
            <Route
              path="/store/:categoryId/:categoryTitle"
              element={<CategoryStorePage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Dashboard />}>
              <Route path="home" element={<Home />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="about" element={<AboutUser />}></Route>
            </Route>

            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="adminHome" element={<AdminHomeGraph />}></Route>
              <Route path="addProduct" element={<AddProducts />}></Route>
              <Route path="addCategory" element={<AddCategory />}></Route>
              <Route path="categories" element={<ViewCategories />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="users" element={<AdminUsers />}></Route>
              <Route path="products" element={<ViewProducts />}></Route>
            </Route>

            <Route path="/register" element={<Register />} />
          </Routes>
          <PracticeFooter></PracticeFooter>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
