import React, { useState } from "react";
import "./SignUpForm.css";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: name === "email" ? value.toLowerCase() : value,
    });

    if (name === "username") {
      setUsername(value);
    }

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (username.length < 3 || username.length > 20) {
      alert("Username field must be between 3 and 20 characters.");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      alert("Username must only contain letters and numbers.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowercaseEmail = email.toLowerCase();
    if (!emailRegex.test(lowercaseEmail)) {
      alert("Invalid email address.");
      return;
    }

    if (password.length < 6 || password.length > 20) {
      alert("Password must be between 6 and 20 characters.");
      setFormState({
        ...formState,
        password: "",
      });
      setConfirmPassword("");
      setPassword("");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match, please try again.");
      setFormState({
        ...formState,
        password: "",
      });
      setConfirmPassword("");
      setPassword("");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain an uppercase letter, a lowercase letter, and a number."
      );
      setFormState({
        ...formState,
        password: "",
      });
      setConfirmPassword("");
      setPassword("");
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      const user = Auth.loggedIn() ? Auth.getProfile().data.username : null;
      window.location.assign(`/${user}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <video src="/videos/home-video-1.mp4" autoPlay loop muted />
      <div className="sign-up-form">
        <div className="signUpform-input-container">
          {data ? (
            <p>
              Success! You may now head back to the homepage.{" "}
              {/* TODO link to profilepage and profile form once completed */}
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <h2>Create an account!</h2>
              <h5>Enter a username</h5>
              <input
                className="signup-username"
                name="username"
                type="text"
                placeholder="Enter a unique username"
                value={formState.username}
                onChange={handleChange}
              />
              <h5>Enter an email</h5>
              <input
                className="signup-email"
                name="email"
                type="email"
                placeholder="Enter a valid email address."
                value={formState.email}
                onChange={handleChange}
              />
              <h5>Enter a password</h5>
              <input
                className="signup-password"
                name="password"
                type="password"
                placeholder="Password must include one uppercase letter, one lowercase letter, and one number."
                value={formState.password}
                onChange={handleChange}
              />
              <h5>Reenter your password</h5>
              <input
                className="signup-password"
                name="confirmPassword"
                type="password"
                placeholder="Password must include one uppercase letter, one lowercase letter, and one number."
                value={confirmPassword}
                onChange={handleChange}
              />
              <div className="btn-div">
                <button
                  className="signUp-btn"
                  onClick={handleFormSubmit}
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
