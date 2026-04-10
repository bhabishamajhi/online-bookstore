import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:"", author:"", price:0, description:"", category:"", stock:0, rating:0 });

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get(`/books/${id}`);
      setForm(res.data);
    };
    fetchBook();
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, form);
      alert("Book updated successfully!");
      navigate("/");
    } catch (err) { console.error(err); alert("Error updating book"); }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["title","author","price","description","category","stock","rating"].map(field => (
        <div className="mb-3" key={field}>
          <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input type={field==="price"||field==="stock"||field==="rating"?"number":"text"} className="form-control" name={field} value={form[field]} onChange={handleChange} required />
        </div>
      ))}
      <button className="btn btn-warning">Update Book</button>


    </form>
  );
};

export default EditBook;