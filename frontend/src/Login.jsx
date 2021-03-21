import React, {useState} from 'react';
import axios from 'axios';
import styles from './scss/Login.module.scss';

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
    <div className={styles.login}>
      <form>
        <div>
          <label>username</label><br/>
          <input type='text' onChange={changeUsernameEvent}/><br/>
        </div>
        <div>
          <label>password</label><br/>
          <input type='password' onChange={changePasswordEvent}/><br/>
        </div>
        <input type='submit' value='login' onClick={submit}/>
      </form>
    </div>
  );
}

export default Login;