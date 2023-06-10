import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { UPDATE_USER } from "../utils/mutations";

const Account = () => {
  const user = Auth.loggedIn() ? Auth.getProfile().data : null;
  const navigate = useNavigate();
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);
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

    setPasswordState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "updateEmail") {
      setUpdateEmail(value);
    }
  };

  const handleEmailUpdate = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowercaseEmail = updateEmail.toLowerCase();
    if (!emailRegex.test(lowercaseEmail)) {
      alert("Invalid email address.");
    } else {
      try {
        const { data } = await updateUser({
          variables: { email: updateEmail },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordState;

    if (newPassword !== confirmPassword) {
      alert("New password and confirmed password do not match.");
      return;
    }

    try {
      const { data } = await updateUser({
        variables: { password: newPassword },
      });
      console.log(data);
      // Clear password fields after update
      setPasswordState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.username}'s Account</h1>
      <div>
        <h2>{user.email}</h2>
        <form onSubmit={handleEmailUpdate}>
          <h2>Change Email</h2>
          <input
            name="updateEmail"
            placeholder="New email"
            value={updateEmail}
            onChange={handleChange}
          />
          <button type="submit">Update Email</button>
        </form>
      </div>
      <div>
        <form onSubmit={handlePasswordUpdate}>
          <h2>Change Password</h2>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current password"
            value={passwordState.currentPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={passwordState.newPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={passwordState.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
      {/* Display other user account information */}
    </div>
  );
};

export default Account;
