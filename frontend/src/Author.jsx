import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Author(props) {
  const [author, setAuthor] = useState({});

  function handleResponse(response) {
    setAuthor(response.data);
  }

  function handleError(error) {
    console.log(error);
  }

  useEffect(
    () => {
      const token = localStorage.getItem('token');
      axios.get(`http://localhost:3000/author`, {
        headers: {Authorization: `Bearer ${token}`}
      })
        .then((response) => handleResponse(response))
        .catch((error) => handleError(error));
    },
    []
  );

  return <p>{JSON.stringify(author)}</p>;
}

export default Author;