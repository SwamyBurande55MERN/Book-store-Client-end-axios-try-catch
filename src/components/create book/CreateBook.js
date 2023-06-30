import React, { useState } from 'react';
import "./CreateBook.css";
import { Link, useNavigate } from 'react-router-dom';
import { Book } from '@mui/icons-material';
import axios from 'axios';

const NewBookForm = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [available, setAvailable] = useState('');
  const [image, setImage] = useState('');
  // const {id} = useParams();
  const navigate = useNavigate();

  // useEffect(()=> {
  //   if(id){
  //     // fetch the book and set the form values for editing
  //     const fetchBookDetails = async () => {
  //       try{
  //         const response = await axios.get(`http://localhost:8000/getonebook/${id}`);
  //         const bookData = response.data;
  //         setBookName(bookData.bookName);
  //         setAuthor(bookData.author);
  //         setDescription(bookData.description);
  //         setPrice(bookData.price);
  //         setPublishDate(bookData.publishDate);
  //         setAvailable(bookData.available);
  //         setImage(bookData.image);
  //       }catch(err){
  //         console.error(`Error while fetching book details in editbook route : ${err}`);
  //       }
  //     }
  //     fetchBookDetails();
  //   }
  // }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!bookName || !author || !description || !price || !publishDate || !available || !image) {
        alert('All book fields are mandatory');
        return;
      }

      const newBookData = {
        bookName,
        author,
        description,
        price,
        publishDate,
        available,
        image,
      };

      let response;
      // if(id){
      //   response = await axios.put(`http://localhost:8000/updatebook/${id}`, newBookData);
      //   alert(`book updated successfully`);
      //   navigate("/home");
      // }
      // else{
      response = await axios.post(`http://localhost:8000/newbook`, newBookData);
      alert(`New book created successfully`);
      // }

      console.log(response.data);
      // Clear the form after successful submission
      setBookName('');
      setAuthor('');
      setDescription('');
      setPrice('');
      setPublishDate('');
      setAvailable('');
      setImage('');
      navigate("/home");
    } catch (error) {
      console.error('Error while creating book:', error.message);
    }
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

        </nav>
      </header>

      <div className="Newbook-container" >
        <h1>create book</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="Book name" id="bookName" value={bookName} onChange={(e) => setBookName(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="author" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <input placeholder="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <input type="number" placeholder="book price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="publish date" id="publishDate" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
          </div>
          <div  >
            <label id="available">Available:</label>
            <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
          </div>
          <div>
            <input type="text" placeholder="image Url" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div><button type="submit">create book</button></div>
        </form>
      </div>
    </div>
  );
};

export default NewBookForm;
