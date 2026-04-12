import { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then(res => {
        console.log(res.data); 
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          setBooks([]);
        }
      })
      .catch(err => {
        console.error(err);
        setBooks([]);
      });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {Array.isArray(books) && books.length > 0 ? (
        books.map(book => (
          <BookCard key={book._id} book={book} />
        ))
      ) : (
        <p>No books available</p>
      )}

    </div>
  );
}