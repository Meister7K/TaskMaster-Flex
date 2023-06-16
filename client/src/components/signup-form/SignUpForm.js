import React, { useState } from "react";
import "./SignUpForm.css";
import { Link } from "react-router-dom";
import WarriorPic from "./signUpAssets/WarriorSignUp4.png";
import ShieldPic from "./signUpAssets/Shield1.png";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import ReactModal from "react-modal";

import Auth from "../../utils/auth";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      setPasswordMismatchError("");
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match, please try again.");
      }
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      if(!e.message) {
         console.error(e);
      } else {
         console.error(e.message);
      }
      
      if (e.message.includes("username: Path `username` is required.")) {
        console.log(e)
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
        e.message.includes("Passwords do not match, please try again.")
      ) {
        e.message = "Passwords do not match, please try again.";
        setPasswordMismatchError(e.message);
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
      setModalIsOpen(true);
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
                {window.location.assign("/")}
                {/* TODO link to profilepage and profile form once completed */}
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <img className="warrior-image" src={WarriorPic} />
                <div className="sign-up-header">
                  <h2>Create an Account!</h2>
                </div>
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
                <h5>Re-enter your password</h5>
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
            {/* {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
            {passwordMismatchError && (
              <div className="my-3 p-3 bg-danger text-white">
                {passwordMismatchError}
              </div>
            )} */}
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Error Modal"
        className="modal-container"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <img className="shield-image" src={ShieldPic} />
          <h2>Error</h2>
          {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
            {passwordMismatchError && (
              <div className="my-3 p-3 bg-danger text-white">
                {passwordMismatchError}
              </div>
            )}
          <button className="modal-button" onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </ReactModal>
    </>
  );
}

export default SignUpForm;
