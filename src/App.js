import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateBook from "./components/create book/CreateBook.js";
import DisplayBook from "./components/display book/DisplayBook.js";
import Signup from "./components/signup/Signup.js";
import Login from "./components/login/login.js";
import Home from './components/home/Home.js';
import EditBook from './components/edit book/Editbook.js';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/createBook/:id" element={<CreateBook/>} />
          <Route path="/getonebook/:id" element={<DisplayBook/> } />
          <Route exact path="/" element={<Signup/>} />
          <Route path="/editbook/:id" element={<EditBook/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;