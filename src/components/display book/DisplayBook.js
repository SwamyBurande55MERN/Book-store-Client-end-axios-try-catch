import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { Book } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import "./DisplayBook.css";

const DisplayBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getonebook/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error(`error while fetching book using id`, err);
      }
    }
    fetchSingleBookDetails();
  }, [id]); // id => dependency array

  if (!book) {
    return (<div> Loading ..... </div>);
  }

  const handleBookDelete = async() => {
    try{
      await axios.delete(`http://localhost:8000/deleteBook/${id}`);
      alert(`Book deleted successfully`);
      navigate("/home");
    }catch(err){
      console.error(`error while deleting the book ${err}`);
    }
  }

  const handleBookEdit = () => {
    navigate(`/editbook/${id}`);
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
          <Link to="/createbook" className="nav-link">Create Book</Link>
        </nav>
      </header>

      <div className="book-container" >
        <div className="book-details">
          <h2><b>Book Title :</b>{book.bookName}</h2>
          <button style={{ position: "relative", left: "20rem", bottom: "3rem" }} onClick={handleBookDelete} > <DeleteOutlineIcon className="bin-icon" /> </button>
          <button style={{ position: "relative", left: "20rem", bottom: "3rem" }} onClick={handleBookEdit} > <EditIcon className="edit-icon" /> </button>
          <p><b>Book Author : </b>{book.author} </p>
          <p><b>Description :</b>{book.description} </p>
          <p><b>Publish Date :</b>{book.publishDate} </p>
          <p><b>Book price : </b>{book.price} </p>
          <img src={book.image} alt={book.title} className="image-Container" />
          
        </div>
      </div>
    </div>



  )
}

export default DisplayBook;
