import './scss/Header.module.scss';
import {Link} from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <nav>
        <Link to='/books'>BOOKS</Link>
        <Link to='/register'>REGISTER</Link>
        <Link to='/login'>LOGIN</Link>
      </nav>
    </header>
  );
}

export default Header;