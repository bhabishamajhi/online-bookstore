import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddBook = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:"", author:"", price:0, description:"", category:"", stock:0, rating:0 });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/books", form);
      alert("Book added successfully!");
      navigate("/");
    } catch (err) { console.error(err); alert("Error adding book"); }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["title","author","price","description","category","stock","rating"].map(field => (
        <div className="mb-3" key={field}>
          <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input type={field==="price"||field==="stock"||field==="rating"?"number":"text"} className="form-control" name={field} value={form[field]} onChange={handleChange} required />
        </div>
      ))}
      <button className="btn btn-primary">Add Book</button>
 
    </form>
  );
};

export default AddBook;