import React, { useState } from "react";
import "./SignUpForm.css";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
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
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match, please try again.");
      setPassword('');
      setConfirmPassword('');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain an uppercase letter, a lowercase letter, and a number."
      );
      setPassword("");
      setConfirmPassword("");
      return;
    }

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    const userData = {
      username,
      email,
      password,
    };

    // try {
    //   const data = await signup(userData);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    <>
      <div className="sign-up-form">
        <div className="signUpform-input-container">
          <h2>Create an account!</h2>
          <h5>Enter a username</h5>
          <input
            className="signup-username"
            type="text"
            placeholder="Enter a unique username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <h5>Enter an email</h5>
          <input
            className="signup-email"
            type="text"
            placeholder="Enter a valid email address."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Enter a password</h5>
          <input
            className="signup-password"
            type="password"
            placeholder="Password must include one uppercase letter, one lowercase letter, and one number."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <h5>Reenter your password</h5>
          <input
            className="signup-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <div className="btn-div">
            <button className="signUp-btn" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
