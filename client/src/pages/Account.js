import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const Account = () => {
  const user = Auth.loggedIn() ? Auth.getProfile().data : null;
  const navigate = useNavigate();
  const [updateEmail, setUpdateEmail] = useState("");
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!Auth.loggedIn()) {
      // User is not logged in, redirect to home page
      navigate("/");
    }
  }, [navigate]);


  const handleChange = (event) => {
    const { name, value } = event.target;

    




  }
  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.username}'s Account</h1>
      <div>
        <h2>{user.email}</h2>
        <h2>Change Email</h2>
        <input 
        type="email" 
        name="email"
        placeholder="New email" 
        />
        <button>Update Email</button>
      </div>
      <div>
        <h2>Change Password</h2>
        <input
        type="password" 
        placeholder="Current password" 
        />
        <input 
        type="password" 
        placeholder="New password" 
        />
        <input 
        type="password" 
        placeholder="Confirm new password" 
        />
        <button>Update Password</button>
      </div>
      {/* Display other user account information */}
    </div>
  );
};

export default Account;
