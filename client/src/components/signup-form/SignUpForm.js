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

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      const user = Auth.loggedIn() ? Auth.getProfile().data.username : null;
      window.location.assign(`/${user}`);
    } catch (e) {
      console.error(e.message);
      if (e.message.includes("username: Path `username` is required.")) {
        e.message = "You must enter a username.";
      } else if (
        e.message.includes(
          "user validation failed: email: Path `email` is required."
        )
      ) {
        e.message = "You must enter an email.";
      } else if (
        e.message.includes(
          "user validation failed: password: Path `password` is required."
        )
      ) {
        e.message = "You must enter a password.";
      } else if (
        e.message.includes(
          "username: Username must be between 3 and 20 characters long."
        )
      ) {
        e.message = "Username must be between 3 and 20 characters long.";
      } else if (
        e.message.includes(
          "username: Username may only include letters and numbers."
        )
      ) {
        e.message = "Username may only include letters and numbers.";
      } else if (
        e.message.includes(
          "user validation failed: email: Please enter a valid email address."
        )
      ) {
        e.message = "Please enter a valid email address.";
      } else if (
        e.message.includes(
          "user validation failed: password: Password must contain at least one lowercase letter, one uppercase letter, and one number. Password may include special characters!"
        )
      ) {
        e.message =
          "Password must contain at least one lowercase letter, one uppercase letter, and one number. Password may include special characters!";
        setFormState({
          ...formState,
          password: "",
        });
        setConfirmPassword("");
        setPassword("");
      } else if (
        e.message.includes(
          "user validation failed: password: Password must be between 6 and 20 characters long."
        )
      ) {
        e.message = "Password must be between 6 and 20 characters long.";
        setFormState({
          ...formState,
          password: "",
        });
        setConfirmPassword("");
        setPassword("");
      } else if (
        e.message.includes(
          "E11000 duplicate key error collection: taskmaster-flex.users index: username"
        )
      ) {
        e.message = "Username taken.";
      } else if (
        e.message.includes(
          "E11000 duplicate key error collection: taskmaster-flex.users index: email"
        )
      ) {
        e.message = "Email is already in use.";
      }
      if (password !== confirmPassword) {
        e.message = "Passwords do not match, please try again.";
        setFormState({
          ...formState,
          password: "",
        });
        setConfirmPassword("");
        setPassword("");
        return;
      }
    }
  };

  return (
    <>
      <video src="/videos/Taskmaster-Demo.mp4" autoPlay loop muted />
      <div className="sign-up-form-outer-container">
        <div className="sign-up-form">
          <div className="signUpform-input-container">
            {data ? (
              <p>
                Success! You may now head back to the homepage.{" "}
                {/* TODO link to profilepage and profile form once completed */}
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h2>Create an Account!</h2>
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
      </div>
    </>
  );
}

export default SignUpForm;
