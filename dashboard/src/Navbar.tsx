import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Weatherman</h1>
      <div className="links">
        <Link to="/">Prediction</Link>
        <Link to="/history">Data History</Link>
      </div>
    </nav>
  );
};

export default Navbar;
