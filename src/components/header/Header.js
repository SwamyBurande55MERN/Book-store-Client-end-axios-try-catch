import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@mui/icons-material';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <Book className="book-icon" />
        </Link>
      </div>
      <nav className="nav-items">
        <Link to="/home" className="nav-link">All Books</Link>
        <Link to="/aboutus" className="nav-link">About Us</Link>
        <Link to="/createbook" className="nav-link">Create Book</Link>
        <Link to="/" className="nav-link">Signup</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
