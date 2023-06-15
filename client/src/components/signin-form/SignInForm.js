import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import "./SignInForm.css";

import Auth from "../../utils/auth";

const SignInForm = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      const loggedInUser = Auth.loggedIn()
        ? Auth.getProfile().data.username
        : null;

      window.location.assign(`/${loggedInUser}`);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  const user = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const helloUserClass = user && user.length > 15 ? "hello-user small-font" : "hello-user";

  return (
    <div className="navbar-sign-in-form">
      <div className="form-input-container">
        {user ? (
          <div className="logout-container">
            <div className="logout-wrapper">
              <p className={helloUserClass}>{user}</p>
              <div className="button-wrapper">
                <button
                  className="navbar-btn login-submit-btn"
                  buttonstyle="signIn-btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Auth.logout();
                  }}
                >
                  Logout
                </button>
                <button
                  className="navbar-btn login-submit-btn"
                  buttonstyle="singIn-btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/${user}/account`)}
                >
                  Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <h5>Sign In To Play:</h5>
            <div className="login-form-wrapper">
              <div className="input-columns">
                <input
                  className="navbar-input"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="navbar-input"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div className="btn-bg">
                <button
                  className="navbar-btn login-submit-btn"
                  buttonstyle="signIn-btn"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {error && (
        <div className="login-warning-message">
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
