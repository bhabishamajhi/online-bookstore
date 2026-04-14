import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import Cart from "./components/Cart";

const App = () => {
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
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
