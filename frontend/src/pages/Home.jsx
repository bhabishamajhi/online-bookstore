import { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then(res => {
        console.log("DATA:", res.data);
        setBooks(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("FETCH ERROR:", err);
        setBooks([]); // ✅ prevent crash
      });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {books.length > 0 ? (
        books.map(book => (
          <BookCard key={book._id} book={book} />
        ))
      ) : (
        <h2>Loading or No Books Found</h2>
      )}

    </div>
  );
}