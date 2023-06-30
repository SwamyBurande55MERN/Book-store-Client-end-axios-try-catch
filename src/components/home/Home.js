import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Book } from '@mui/icons-material';
import "./Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  // const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getallbooks");
        setBooks(response.data);
      } catch (err) {
        console.error(`error while fetching books`, err);
      }
    }

    fetchBooks();
  }, [])

  const logout = () => {
    // Clear user tokens or authentication state
    localStorage.removeItem('accessToken'); // Removing the access token from local storage
    localStorage.removeItem('refreshToken'); // Removing the refresh token from local storage
  
    // Redirect to the home page
    window.location.href = '/'; 
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <Book className="book-icon" />
          </Link>
        </div>
        <nav className="nav-items">
          <Link to="/home" className="nav-link">All Books</Link>
          <Link to="/createbook/:id" className="nav-link">Create Book</Link>
          <Link to="/" className="nav-link" onClick={logout} >Logout</Link>
        </nav>
      </header>

      <div className="home-container">
        <h1>Welcome to Book store</h1>
        <div className="books-container">
          {books.map((book) => (
            <Link to={`/getonebook/${book._id}`} key={book._id} className="book-card" style={{ textDecoration: 'none', color : "black"}} >
              <div >
                <h2><b>Book Title : </b>{book.bookName}</h2>
                <p ><b>Book Author : </b>{book.author}</p>
                <p ><b>Description :</b>{book.description}</p>
                <div className="image-container">
                  <img src={book.image} alt={book.title} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>

  )
}

export default Home;