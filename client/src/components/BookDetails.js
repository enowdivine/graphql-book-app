import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_BOOK } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_SINGLE_BOOK, {
    variables: { id: bookId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No Book Selected</p>;

  const displayDetails = () => {
    const { book } = data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books?.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
    return <p>No Book Selected</p>;
  };

  return <div id="book-details">{displayDetails()}</div>;
};

export default BookDetails;
