import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'
import './scss/Footer.module.scss';

function Footer(props) {
  return (
    <footer>
      <h4>Contact</h4>
      <p>Iulia-Maria Tomulescu</p>
      {/*<FontAwesomeIcon icon={faPaperPlane} />*/}
      {/*<FontAwesomeIcon icon={faPhone} flip="horizontal"/>*/}
      <a href='mailto:iulia.maria.tomulescu@gmail.com'>iulia.maria.tomulescu@gmail.com</a>
    </footer>
  );
}

export default Footer;