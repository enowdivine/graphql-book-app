import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from "../queries/queries";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook, options] = useMutation(ADD_BOOK);

  if (loading) return <p>Authors Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const displayAuthors = () => {
    return data.authors.map((author, index) => (
      <option key={index} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const submit = (e) => {
    e.preventDefault();
    addBook({
      variables: { name: bookName, genre, authorId },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  return (
    <form id="add-book">
      <div className="field">
        <label htmlFor="field">Book name</label>
        <input type="text" onChange={(e) => setBookName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="field">Genre</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="field">Author</label>
        <select name="" id="" onChange={(e) => setAuthorId(e.target.value)}>
          <option value="">Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button onClick={submit}>
        {options.loading ? <p>Loading...</p> : <span>+</span>}
      </button>
      {options.error && <span>{options.error.message}</span>}
    </form>
  );
};

export default AddBook;
