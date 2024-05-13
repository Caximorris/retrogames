import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <header>
            <nav className="navbar home-page">
                <Link to="/">Retro Games</Link>
                <ul>
                    <li>
                        <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
                    </li>
                    <li>
                        <Link to="/pong">Pong</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;