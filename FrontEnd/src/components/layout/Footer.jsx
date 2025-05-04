import {FaFacebook, FaLinkedin, FaInstagram} from 'react-icons/fa';
import styles from '../../styles/layout_styles/Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul>
                <li><FaFacebook /></li>
                <li><FaLinkedin /></li>
                <li><FaInstagram /></li>
            </ul>
            <p className={styles.copyright}>Todos os direito reservados a equipe <span>Fast&Fair</span> &copy; 2025</p>
        </footer>
    )
}
export default Footer;
