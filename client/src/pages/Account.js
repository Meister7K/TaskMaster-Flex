import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Account = () => {
  const user = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      // User is not logged in, redirect to home page
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h1>{user}'s Account</h1>
      {/* Display user account information */}
    </div>
  );
};

export default Account;
