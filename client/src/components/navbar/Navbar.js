import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "../button/Button";
import SignInForm from "../signin-form/SignInForm";
import Auth from "../../utils/auth";
import Music from "../music/Music";

function Navbar() {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const loggedInUser = Auth.loggedIn()
      ? Auth.getProfile().data.username
      : null;
    setUser(loggedInUser);
  }, []);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const homePath = user ? `/${user}` : "/";
  const isAuthenticated = Auth.loggedIn();

  if (isAuthenticated) {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to={homePath}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/${user}/tasks`}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/${user}/play`}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Play
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/${user}/shop`}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/${user}/profile`}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <SignInForm />
          <Music />
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-links custom-cursor"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-links custom-cursor"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className="nav-links custom-cursor"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <SignInForm />
          <Music />
        </nav>
      </>
    );
  }
}

export default Navbar;
