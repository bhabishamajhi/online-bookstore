import { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then(res => {
        setBooks(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error(err);
        setBooks([]);
      });
  }, []);

  return (
    <div className="row">
      {books.length > 0 ? (
        books.map(book => (
          <div className="col-md-3 mb-3" key={book._id}>
            <BookCard book={book} />
          </div>
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}