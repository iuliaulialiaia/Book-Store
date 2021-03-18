import React from 'react';
import {HashRouter} from "react-router-dom";
import Author from './Author';

function App() {
  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJVU0VSX1JPTEUiLCJpYXQiOjE2MTU4NDk4MDUsImF1ZCI6InBvc3RtYW4iLCJpc3MiOiJzdHVkZW50Iiwic3ViIjoibGFib3JhdG9yIn0.DMeMmrR3VxuHL8OkVpjHYAluDnH6ZDBAv4PjO1uf6AY');
  return (
    <HashRouter>
      <Author/>
    </HashRouter>
  );
}

export default App;
