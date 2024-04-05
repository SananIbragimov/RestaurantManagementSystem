import React from "react";
import Layout from "./layouts/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category/Category";
import Product from "./pages/Product/Product";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
