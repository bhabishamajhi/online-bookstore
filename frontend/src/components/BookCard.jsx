import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/edit/${book._id}`);
  const handleDetails = () => navigate(`/books/${book._id}`);

  const handleDelete = async () => {
  if (!onDelete) return; 

  if (window.confirm("Are you sure?")) {
    try {
      await api.delete(`/books/${book._id}`);
      onDelete(book._id);
    } catch (err) {
      console.error(err);
      alert("Error deleting book");
    }
  }
};



  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i} style={{ color: i < book.rating ? "#ffc107" : "#e4e5e9" }}>★</span>);
    }
    return stars;
  };

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">Author: {book.author}</p>
        <p className="card-text">Price: ${book.price}</p>
        <p className="card-text">Category: {book.category}</p>
        <p className="card-text">{renderStars()}</p>
        <div className="mt-auto d-flex justify-content-between">
          <button style={{ backgroundColor: "transparent", border: "none", color: "#007bff", cursor: "pointer" }} onClick={handleDetails}>Details</button>
          <button style={{ backgroundColor: "transparent", border: "none", color: "black", cursor: "pointer" }} onClick={handleEdit}>Edit</button>
          <button style={{ backgroundColor: "transparent", border: "none", color: "red", cursor: "pointer" }} onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;