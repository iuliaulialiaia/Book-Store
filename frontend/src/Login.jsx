import React, {useState} from 'react';
import axios from 'axios';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function changeUsernameEvent(syntheticEvent) {
    setUsername(syntheticEvent.target.value);
  }

  function changePasswordEvent(syntheticEvent) {
    setPassword(syntheticEvent.target.value);
  }

  function handleResponse(response) {
    localStorage.setItem('token', response.data);
  }

  function handleError(error) {
    console.log(error);
  }

  function submit(syntheticEvent) {
    let data = {
      username: username,
      password: password
    };

    axios.post('http://localhost:3000/login', data)
      .then((response) => handleResponse(response))
      .catch((error) => handleError(error));
  }

  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <label>Username</label>
        <input type='text' onChange={changeUsernameEvent}/>
        <label>Password</label>
        <input type='password' onChange={changePasswordEvent}/>
        <input type='submit' value='submit' onClick={submit}/>
      </form>
    </div>
  );
}

export default Login;