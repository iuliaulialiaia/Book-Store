import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import styles from './scss/App.module.scss';
import Book from './Book';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className={styles.app}>
      <Header/>

      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/books' component={Book}/>
      </Switch>

      <Footer/>
    </div>
  );
}

export default App;
