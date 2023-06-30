import React, { useState } from "react";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate  } from 'react-router-dom';
import { Book } from '@mui/icons-material';
import "./Signup.css";

const Signup = () => {
      const navigate = useNavigate();
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, SetConfirmPassword] = useState("");

      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
      const [show, setShow] = useState(true);
      const [cshow, setCShow] = useState(true);

      const handleUsername = (event) => {
            setUsername(event.target.value);
      };
      const handlePassword = (event) => {
            setPassword(event.target.value);
      };
      const handleCpassword = (event) => {
            SetConfirmPassword(event.target.value);
      };

      const handleSubmit = (event) => {
            event.preventDefault();
            if (password !== confirmPassword) {
                  setError(`Passwords does not match!`);
                  // alert(`passwords does not match!`)
                  return;
            }
            setError("");
            setLoading(true);

            try {
                  const fetchData = axios.post("http://localhost:8000/register", {
                        name: username,
                        password: password,
                        cPassword: confirmPassword,
                  });
                  // Handle the response from the backend API
                  console.log(fetchData.data); // Display or handle success message
                  alert(`Login successfull`);
                  navigate("/login");
            } catch (error) {
                  console.log(error.fetchData.data);
            }
            setLoading(false);
            setUsername("");
            setPassword("");
            SetConfirmPassword("");
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
       {/* <Link to="/home" className="nav-link">All Books</Link>
        <Link to="/aboutus" className="nav-link">About Us</Link>
        <Link to="/createbook" className="nav-link">Create Book</Link> */}
         <Link to="/" className="nav-link">Signup</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    </header>
            
            <div className="signup">
                  <h2>User Signup</h2>
                  <form onSubmit={handleSubmit}>
                        <div className="username">
                              <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsername}
                                    placeholder="username"
                              />
                        </div>
                        <div classname="password">
                              <input
                                    type={show ? "password" : "text"}
                                    value={password}
                                    onChange={handlePassword}
                                    placeholder="password"
                              />
                              {!show && <VisibilityIcon style={{ fontSize: "20px" }} className='visible_icon' onClick={() => {
                                    setShow(!show)
                              }} ></VisibilityIcon>}
                              {show && <VisibilityOffIcon style={{ fontSize: "20px" }} className='visible_icon'
                                    onClick={() => {
                                          setShow(!show)
                                    }}
                              ></VisibilityOffIcon>}
                        </div>
                        <div classname="cPassword">
                              <input
                                    type={cshow ? "password" : "text"}
                                    value={confirmPassword}
                                    onChange={handleCpassword}
                                    placeholder="confirm password"
                              />
                               {!cshow && <VisibilityIcon style={{ fontSize: "20px" }} className='visible_icon' onClick={() => {
                        setCShow(!cshow)
                    }} ></VisibilityIcon>}
                    {cshow && <VisibilityOffIcon style={{ fontSize: "20px" }} className='visible_icon'
                        onClick={() => {
                            setCShow(!cshow)
                        }}
                    ></VisibilityOffIcon>}
                        </div>

                        <button type="submit" disabled={loading}>
                              {loading ? "Loading..." : "Sign Up"}
                        </button>
                        {error && <div>{error}</div>}
                  </form>

                  <div>
                        <p>Already have an account, Login instead!</p>
                  </div>
            </div>
            </div>
      );
};

export default Signup;
