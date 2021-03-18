import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Book(props) {
  const [book, setBook] = useState({});

  function handleResponse(response) {
    setBook(response.data);
  }

  function handleError(error) {
    console.log(error);
  }

  useEffect(
    () => {
      const token = localStorage.getItem('token');
      axios.get(`http://localhost:3000/book`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => handleResponse(response))
        .catch((error) => handleError(error));
    },
    []
  );

  return <p>{JSON.stringify(book)}</p>;
}

export default Book;