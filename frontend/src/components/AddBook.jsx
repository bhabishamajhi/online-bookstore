import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddBook = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    rating: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/books", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: Number(form.rating)
      });

      alert("Book added successfully!");
      navigate("/books");
    } catch (err) {
      console.error(err);
      alert("Error adding book");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>

          <input
            type={
              field === "price" || field === "stock" || field === "rating"
                ? "number"
                : "text"
            }
            className="form-control"
            name={field}
            value={form[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button className="btn btn-primary">Add Book</button>
    </form>
  );
};

export default AddBook;