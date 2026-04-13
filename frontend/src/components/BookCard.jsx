import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  if (!book) return null;

  return (
    <div className="card p-2">
      <h5>{book.title || "No Title"}</h5>
      <p>{book.author || "Unknown"}</p>
      <p>${book.price || 0}</p>

      <button
        className="btn btn-primary btn-sm"
        onClick={() => navigate(`/books/${book._id}`)}
      >
        Details
      </button>
    </div>
  );
}