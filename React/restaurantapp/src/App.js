import React, { useEffect } from "react";
import { LanguageProvider } from "./features/LanguageContext";
import Layout from "./layouts/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category/Category";
import Product from "./pages/Product/Product";
import Login from "./pages/Account/Login";
import { useSelector, useDispatch } from "react-redux";
import Register from "./pages/Account/Register";
import User from "./pages/User/User";
import { checkTokenExpiration } from "./helpers/authHelper";
import { logOutAction } from "./redux/slices/accountSlice";
import Menu from "./pages/Menu/Menu";
import Table from "./pages/Table/Table";
import Reservation from "./pages/Reservation/Reservation";
import Order from "./pages/Order/Order";
import Report from "./pages/Report/Report";

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
        <LanguageProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/product" element={<Product />} />
                  {role === "SuperAdmin" && (
                    <Route path="/user" element={<User />} />
                  )}
                  <Route path="/table" element={<Table />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/reservation" element={<Reservation />} />
                  <Route path="/menu" element={<Menu />} />
                  {role === "SuperAdmin" && (
                    <Route path="/report" element={<Report />} />
                  )}
                  <Route path="*" element={<NotFound />} />
                </Route>
                {role === "SuperAdmin" && (
                  <Route path="/register" element={<Register />} />
                )}
              </>
            ) : (
              <Route path="*" element={<Navigate replace to="/login" />} />
            )}
          </Routes>
        </LanguageProvider>
      </Router>
    </>
  );
}

export default App;
