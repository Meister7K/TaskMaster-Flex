import React from "react";
import { Button } from "./Button";
import "./SignInForm.css";

function SignInForm() {
  return (
    <>
      <div className="navbar-sign-in-form">
        <div className="form-input-container">
          <h5>Please Sign In To Play:</h5>
          <input className="navbar-input" type="text" placeholder="Username" />
          <input
            className="navbar-input"
            type="password"
            placeholder="Password"
          />
        </div>
        <Button className="navbar-btn" buttonstyle="btn-outline">
          Sign In
        </Button>
      </div>
    </>
  );
}

export default SignInForm;
