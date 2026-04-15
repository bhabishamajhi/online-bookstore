import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
  const fetchBook = async () => {
    try {
      console.log("ID:", id);

      const res = await api.get(`/books/${id}`);

      console.log("RAW RESPONSE:", res.data);

      const bookData = Array.isArray(res.data)
        ? res.data[0]
        : res.data;

      setBook(bookData);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchBook();
}, [id]);

  const handleAddToCart = async () => {
  try {
    const res = await fetch("https://online-bookstore-uwqb.onrender.com/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "default-user",
        bookId: book._id,
        title: book.title,
        price: book.price,
        quantity: 1
      })
    });

    const data = await res.json();
    console.log("FETCH RESPONSE:", data);

  } catch (err) {
    console.log("FETCH ERROR:", err);
  }
};
  if (!book) return <p>Loading....</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h3>{book.title || "No Title"}</h3>
        <p>Author: {book.author || "No Author"}</p>
        <p>Price: ${book.price || 0}</p>
        <p>Category: {book.category || "No Category"}</p>
        <p>Description: {book.description || "No Description"}</p>
        <p>Stock: {book.stock || 0}</p>
        <button
  className="btn btn-success"
  onClick={() => handleAddToCart(book)}
>
  Add to Cart
</button>
      </div>
    </div>
  );
};

export default BookDetails;