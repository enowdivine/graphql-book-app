import React from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_AUTHORS = gql`
{
  authors{
    name
  }
}
`;

const AuthorList = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
    <ul id="author-list">
      {/* {data.authors.map( (author, index) =>(
         <li key={index}>{author.name}</li>
      ))}
      */}
    </ul>
  </div>
  )
}

export default AuthorList