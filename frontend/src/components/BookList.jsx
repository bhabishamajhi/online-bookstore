import React, { useEffect, useState } from "react";
import api from "../api";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);

      const uniqueCategories = ["All", ...new Set(res.data.map(b => b.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setBooks(books.filter(book => book._id !== id));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = (Array.isArray(books) ? books : []).filter(book => {
  const title = (book?.title || "").toLowerCase();
  const author = (book?.author || "").toLowerCase();

  const matchesSearch =
    title.includes(search.toLowerCase()) ||
    author.includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || book?.category === category;

  return matchesSearch && matchesCategory;
});
  return (
    <>
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="form-control"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredBooks.map(book => (
          <div className="col" key={book._id}>
            <BookCard book={book} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </>
  );
};

export default BookList;