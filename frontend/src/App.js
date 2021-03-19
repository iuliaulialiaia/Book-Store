import React from 'react';
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Book from './Book';
import Author from './Author';

function App() {
  return (
    <BrowserRouter>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/book'>Books</Link>
      <Link to='/author'>Authors</Link>

      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/book' component={Book}/>
        <Route path='/author' component={Author}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
