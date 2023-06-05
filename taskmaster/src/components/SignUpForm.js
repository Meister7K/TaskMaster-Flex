import React from "react";
import { Button } from "./Button";
import "./SignUpForm.css";

function SignUpForm() {
  return (
    <>
      <div className="sign-up-form">
        <div className="form-input-container">
          <h5>Enter a username</h5>
          <input
            className="signup-username"
            type="text"
            placeholder="Enter a username - must be unique"
          />
          <h5>Enter an email</h5>
          <input
            className="signup-email"
            type="text"
            placeholder="Enter a valid email address."
          />
          <h5>Enter a password</h5>
          <input className="signup-password" type="password" />
          <h5>Reenter your password</h5>
          <input className="signup-password" type="password" />
          <Button className="navbar-btn" buttonStyle="btn-outline">
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
