import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './scss/Book.module.scss';

const INF = 100;

function Book(props) {
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [filters, setFilters] = useState({
    authors: [],
    publishers: [],
    prices: []
  });
  const [search, setSearch] = useState('');

  function handleBookResponse(response) {
    setAllBooks(response.data);
    setBooks(response.data);
  }

  function handleAuthorResponse(response) {
    setAuthors(response.data);
  }

  function handlePublisherResponse(response) {
    setPublishers(response.data);
  }

  function handleError(error) {
    console.log(error);
  }

  useEffect(
    () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {Authorization: `Bearer ${token}`}
      };

      axios.get(`http://localhost:3000/book`, config)
        .then((response) => handleBookResponse(response))
        .catch((error) => handleError(error));
      axios.get('http://localhost:3000/author', config)
        .then((response) => handleAuthorResponse(response))
        .catch((error) => handleError(error));
      axios.get('http://localhost:3000/publisher', config)
        .then((response) => handlePublisherResponse(response))
        .catch((error) => handleError(error));
    },
    []
  );

  useEffect(() => {
    function filteredByAuthors() {
      return filters.authors.length !== 0;
    }

    function filteredByPublishers() {
      return filters.publishers.length !== 0;
    }

    function filteredByPrice() {
      return filters.prices.length !== 0;
    }

    //  alert(JSON.stringify(filters.prices));

    let filteredBooks = [];
    if (!filteredByAuthors() && !filteredByPublishers() && !filteredByPrice()) {
      filteredBooks = allBooks;
    } else if (filteredByAuthors() && !filteredByPublishers() && !filteredByPrice()) {
      filteredBooks = allBooks.filter(book => filters.authors.includes(book.Autor));
    } else if (!filteredByAuthors() && filteredByPublishers() && !filteredByPrice()) {
      filteredBooks = allBooks.filter(book => filters.publishers.includes(book.Editura));
    } else if (!filteredByAuthors() && !filteredByPublishers() && filteredByPrice()) {
      filteredBooks = allBooks.filter(book =>
        filters.prices.find(price =>
          price.min <= book.Pret && book.Pret <= price.max)
      );
    } else if (filteredByAuthors() && filteredByPublishers() && !filteredByPrice()) {
      filteredBooks = allBooks.filter(book => filters.authors.includes(book.Autor))
        .filter(book => filters.publishers.includes(book.Editura));
    } else if (filteredByAuthors() && !filteredByPublishers() && filteredByPrice()) {
      filteredBooks = allBooks.filter(book => filters.authors.includes(book.Autor))
        .filter(book =>
          filters.prices.find(price =>
            price.min <= book.Pret && book.Pret <= price.max)
        );
    } else if (!filteredByAuthors() && filteredByPublishers() && filteredByPrice()) {
      filteredBooks = allBooks.filter(book => filters.publishers.includes(book.Editura))
        .filter(book =>
          filters.prices.find(price =>
            price.min <= book.Pret && book.Pret <= price.max)
        );
    } else if (filteredByAuthors() && filteredByPublishers() && filteredByPrice()) {
      filteredBooks = allBooks.filter(book => filters.authors.includes(book.Autor))
        .filter(book => filters.publishers.includes(book.Editura))
        .filter(book => undefined !==
          filters.prices.find(price =>
            price.min <= book.Pret && book.Pret <= price.max)
        );
    }
    setBooks(filteredBooks);
  },
    [filters]
  );

  useEffect(() => {
    let filteredBooks = [];
    let s = search.trim();
    if (s.length === 0) {
      filteredBooks = allBooks;
    } else {
      filteredBooks = allBooks.filter(book => {
        let author = book.Autor.toLowerCase();
        let name = book.Carte.toLowerCase();
        let search = s.toLowerCase();
        return author.includes(search) || name.includes(search);
      });
    }
    setBooks(filteredBooks);
  },
    [search]
  );

  function authorClickEvent(checked, authorName) {
    const authorFilter = checked ?
      filters.authors.concat([authorName]) :
      filters.authors.filter(author => author !== authorName);
    setFilters(prevFilter => ({...prevFilter, authors: authorFilter}));
  }

  function publisherClickEvent(checked, publisherName) {
    const publisherFilter = checked ?
      filters.publishers.concat([publisherName]) :
      filters.publishers.filter(publisher => publisher !== publisherName);
    setFilters(prevFilter => ({...prevFilter, publishers: publisherFilter}));
  }

  function priceClickEvent(checked, min, max) {
    const currentPrice = {min, max};
    const priceFilter = checked ?
      filters.prices.concat([currentPrice]) :
      filters.prices.filter(price => !(price.min === min && price.max === max));
    setFilters(prevFilter => ({...prevFilter, prices: priceFilter}));
  }

  function changeSearchEvent(syntheticEvent) {
    setSearch(syntheticEvent.target.value);
  }

  return (
    <div>
      <div className={styles.search}>
        <input type='search' placeholder='Search' onChange={changeSearchEvent}/>
      </div>

      <div className={styles.sidebar}>
        <h4>Author</h4>
        {authors.filter(author => author.Name !== '*** ***')
          .map((author, index) =>
            <div key={index}>
              <input type='checkbox'
                     onClick={(syntheticEvent) => {
                       authorClickEvent(syntheticEvent.target.checked, author.Name)
                     }}/>
              <label>{author.Name}</label>
              <br/><br/>
            </div>
          )}

        <h4>Publisher</h4>
        {publishers.map((publisher, index) =>
          <div key={index}>
            <input type='checkbox'
                   onClick={(syntheticEvent) => {
                     publisherClickEvent(syntheticEvent.target.checked, publisher.name)
                   }}/>
            <label>{publisher.name}</label>
            <br/><br/>
          </div>
        )}

        <h4>Price</h4>
        <div>
          <input type='checkbox'
                 onClick={(syntheticEvent) => {
                   priceClickEvent(syntheticEvent.target.checked, 0, 5)
                 }}/>
          <label>0 - 5</label>
          <br/><br/>
          <input type='checkbox'
                 onClick={(syntheticEvent) => {
                   priceClickEvent(syntheticEvent.target.checked, 5, 10)
                 }}/>
          <label>5 - 10</label>
          <br/><br/>
          <input type='checkbox'
                 onClick={(syntheticEvent) => {
                   priceClickEvent(syntheticEvent.target.checked, 10, 20)
                 }}/>
          <label>10 - 20</label>
          <br/><br/>
          <input type='checkbox'
                 onClick={(syntheticEvent) => {
                   priceClickEvent(syntheticEvent.target.checked, 20, 30)
                 }}/>
          <label>20 - 30</label>
          <br/><br/>
          <input type='checkbox'
                 onClick={(syntheticEvent) => {
                   priceClickEvent(syntheticEvent.target.checked, 30, INF)
                 }}/>
          <label>30 +</label>
        </div>
      </div>

      <div className={styles.book}>
        {books.map((book, index) =>
          <div key={index}>
            <h4>{book.Carte}</h4>
            <p>{book.Autor === '*** ***' ? '' : book.Autor}</p>
            <p>{'\u20ac'}{book.Pret}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;