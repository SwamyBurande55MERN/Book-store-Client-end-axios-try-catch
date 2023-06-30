import React, { useState } from "react";
import { Link, useNavigate  } from 'react-router-dom';
import { Book } from '@mui/icons-material';
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "./login.css";

const Login = () => {
      const navigate = useNavigate();
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");

      const [error, setError] = useState("");
      const [show, setShow] = useState(true);
      const [loading, setLoading] = useState(false);

      const handleUsername = (event) => {
            setUsername(event.target.value);
      };
      const handlePassword = (event) => {
            setPassword(event.target.value);
      };

      const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                  setLoading(true);

                  const login = await axios.post("http://localhost:8000/login", {
                        name: username,
                        password: password
                  })
                  if (login.status === 200) {
                        const { token, id } = login.data;
                        console.log(`token :`, token);
                        console.log(`userid :`, id);
                        localStorage.setItem("token", JSON.stringify(login.data.token))
                        setError("");
                        setPassword("");
                        setUsername("");
                        navigate("/home")
                  }
            } catch (error) {
                  if (error.response) {
                        setError(error.response.data.message);
                  } else {
                        setError("An error occurred. Please try again.");
                  }
            }
      }

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
                  
                  <div  className="login">
                  <h2>User Login</h2>
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

                        <button type="submit" disabled={loading}>
                              {loading ? "Loading..." : "Sign Up"}
                        </button>
                        {error && <div>{error}</div>}
                  </form>
                  <p>don't have an account yet! Signup instead.</p>
            </div>
            </div>
      )
}

export default Login;