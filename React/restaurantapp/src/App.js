import React, { useEffect } from "react";
import Layout from "./layouts/Layout";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category/Category";
import Product from "./pages/Product/Product";
import Login from "./pages/Account/Login";
import {useSelector, useDispatch} from "react-redux";
import Register from "./pages/Account/Register";
import User from "./pages/User/User";
import { checkTokenExpiration } from "./helpers/authHelper";
import { logOutAction } from "./redux/slices/accountSlice";

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (checkTokenExpiration()) {
        dispatch(logOutAction());
        clearInterval(intervalId);
      }
    }, 60000);
  
    return () => clearInterval(intervalId);
  }, [dispatch]);
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/category" element={<Category />} />
              <Route path="/product" element={<Product />} />
              <Route path="/user" element={<User />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {role === "SuperAdmin" && <Route path="/register" element={<Register />} />}
          </>
        ) : (
          <Route path="*" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
    </Router>
    </>
  );
}

export default App;
