import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './Book.scss';

function Book(props) {
  const [book, setBook] = useState([]);

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

  const columns = [
    {name: 'Nume', selector: 'Carte', sortable: true},
    {name: 'Autor', selector: 'Autor', sortable: true},
    {name: 'Pret', selector: 'Pret', sortable: true}
  ];

  return <DataTable className='clasa' title="Carti" columns={columns} data={book}/>;
}

export default Book;