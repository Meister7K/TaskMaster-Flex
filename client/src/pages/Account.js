import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { UPDATE_USER, CHANGE_PASSWORD, DELETE_USER } from "../utils/mutations";

const Account = () => {
  const user = Auth.loggedIn() ? Auth.getProfile().data : null;
  const navigate = useNavigate();
  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER);
  const [changePassword, { loading2, error2, data2 }] =
    useMutation(CHANGE_PASSWORD);
  const [deleteUser, { loading3, error3, data3 }] = useMutation(DELETE_USER);
  const [emailPassword, setEmailPassword] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [reenterEmail, setReenterEmail] = useState("");
  const [deleteConfirmationCount, setDeleteConfirmationCount] = useState(0);
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!Auth.loggedIn()) {
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

    if (name === "reenterEmail") {
      setReenterEmail(value);
    }

    if (name === "emailPassword") {
      setEmailPassword(value);
    }
  };

  const handleEmailUpdate = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowercaseEmail = updateEmail.toLowerCase();

    if (!emailRegex.test(lowercaseEmail)) {
      alert("Invalid email address.");
    } else if (updateEmail !== reenterEmail) {
      alert("Emails do not match. Please reenter the email.");
      setUpdateEmail("");
      setReenterEmail("");
      setEmailPassword("");
    } else {
      try {
        await changePassword({
          variables: {
            currentPassword: emailPassword,
            newPassword: emailPassword,
          },
        });

        const { data } = await updateUser({
          variables: { email: updateEmail },
        });

        if (!data) {
          alert("Email not updated!");
        } else {
          alert(
            "Email successfully updated! You must sign in again to proceed."
          );
          Auth.logout();
        }

        setUpdateEmail("");
        setReenterEmail("");
        setEmailPassword("");
      } catch (error) {
        alert(
          "Password verification failed. Please make sure you entered the correct password."
        );
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
      await changePassword({
        variables: { currentPassword, newPassword },
      });

      setPasswordState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password successfully changed!");
    } catch (error) {
      alert(
        "Password verification failed. Please make sure you entered the correct password."
      );
      setPasswordState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmationCount === 0) {
      const confirmFirst = await new Promise((resolve) => {
        setTimeout(() => {
          const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action is irreversible."
          );
          resolve(confirmed);
        }, 0);
      });

      if (confirmFirst) {
        setDeleteConfirmationCount(1);
      } else {
        setDeleteConfirmationCount(0);
      }
    } else if (deleteConfirmationCount === 1) {
      const confirmSecond = await new Promise((resolve) => {
        setTimeout(() => {
          const confirmed = window.confirm(
            "Please confirm again. There is still time to change your mind. Are you sure you want to delete your account?"
          );
          resolve(confirmed);
        }, 0);
      });

      if (confirmSecond) {
        setDeleteConfirmationCount(2);
      } else {
        setDeleteConfirmationCount(0);
      }
    } else if (deleteConfirmationCount === 2) {
      const confirmThird = await new Promise((resolve) => {
        setTimeout(() => {
          const confirmed = window.confirm(
            "This is your last opportunity to reconsider. Deleting your account will permanently remove all your data and cannot be undone. Are you absolutely certain you want to proceed?"
          );
          resolve(confirmed);
        }, 0);
      });

      if (confirmThird) {
        try {
          await deleteUser();

          window.alert("Account successfully deleted!");
          Auth.logout();
          navigate("/");
        } catch (error) {
          window.alert("An error occurred while deleting the account.");
          console.log(error);
        } finally {
          setDeleteConfirmationCount(0);
        }
      } else {
        setDeleteConfirmationCount(0);
      }
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
          <input
            name="reenterEmail"
            placeholder="Reenter email"
            value={reenterEmail}
            onChange={handleChange}
          />
          <input
            type="password"
            name="emailPassword"
            placeholder="Current password"
            value={emailPassword}
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
      <div>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
      {/* Display other user account information */}
    </div>
  );
};

export default Account;
