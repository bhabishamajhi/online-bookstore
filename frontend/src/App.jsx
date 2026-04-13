import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Bookstore</Link>

        <div className="ms-auto">
          <Link className="text-white me-3" to="/add">Add</Link>
          <Link className="text-white" to="/cart">Cart</Link>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}