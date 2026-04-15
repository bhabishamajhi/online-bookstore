import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = async () => {
  try {
    await api.post("/cart", {
      userId: "default-user",
      bookId: book._id,
      title: book.title,
      price: book.price,
      quantity: 1
    });

    alert("Added to cart");
  } catch (err) {
    console.error("Add to cart error:", err);
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
        <button onClick={() => handleAddToCart()}>Add to Cart</button>
      </div>
    </div>
  );
};

export default BookDetails;