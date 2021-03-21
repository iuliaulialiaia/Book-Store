import React, {useState} from 'react';
import axios from 'axios';
import styles from './scss/Register.module.scss';

function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function changeUsernameEvent(syntheticEvent) {
    setUsername(syntheticEvent.target.value);
  }

  function changePasswordEvent(syntheticEvent) {
    setPassword(syntheticEvent.target.value);
  }

  function changeConfirmPasswordEvent(syntheticEvent) {
    setConfirmPassword(syntheticEvent.target.value);
  }

  function handleResponse(response) {
    console.log(response.status);
  }

  function handleError(error) {
    alert(error);
    console.log(error);
  }

  function submit(syntheticEvent) {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    let data = {
      username: username,
      password: password,
      role_id: 4
    };

    axios.post('http://localhost:3000/user', data)
      .then((response) => handleResponse(response))
      .catch((error) => handleError(error));
  }

  return (
    <div className={styles.register}>
      <form>
        <div>
          <label>username</label><br/>
          <input type='text' onChange={changeUsernameEvent}/><br/>
        </div>
        <div>
          <label>password</label><br/>
          <input type='password' onChange={changePasswordEvent}/><br/>
        </div>
        <div>
          <label>confirm password</label><br/>
          <input type='password' onChange={changeConfirmPasswordEvent}/><br/>
        </div>
        <input type='submit' value='register' onClick={submit}/>
      </form>
    </div>
  );
}

export default Register;