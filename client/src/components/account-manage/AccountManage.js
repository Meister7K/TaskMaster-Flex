import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import {
  UPDATE_USER,
  CHANGE_PASSWORD,
  DELETE_USER,
} from "../../utils/mutations";
import "./AccountManage.css";
import ReactModal from "react-modal";
import ShieldPic from "../signup-form/signUpAssets/Shield1.png";

const AccountManage = () => {
  const user = Auth.loggedIn() ? Auth.getProfile().data : null;
  if (!user) {
    window.location.assign("/");
  }
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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

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
    const password = emailPassword;

    if (!emailRegex.test(lowercaseEmail)) {
      setModalContent({
        title: "Error!",
        message: "Please enter a valid email address.",
      });
      setEmailPassword("");
      setModalIsOpen(true);
    } else if (updateEmail !== reenterEmail) {
      setModalContent({
        title: "Error!",
        message: "Emails do not match.",
      });
      setEmailPassword("");
      setModalIsOpen(true);
    } else {
      try {
        const { data } = await updateUser({
          variables: { email: lowercaseEmail, password: password },
        });

        if (!data) {
          setModalContent({
            title: "Error!",
            message: "Email not updated!",
          });
          setEmailPassword("");
        } else {
          setModalContent({
            title: "Success!",
            message:
              "Email successfully updated! You must sign in again to proceed.",
          });
        }
        setUpdateEmail("");
        setReenterEmail("");
        setEmailPassword("");
        setModalIsOpen(true);
        Auth.logout();
      } catch (error) {
        console.error(error);
        if (
          error.message.includes(
            "duplicate key error collection: taskmaster-flex.users index: email"
          )
        ) {
          setModalContent({
            title: "Error!",
            message: "Email already in use.",
          });
        } else if (error.message.includes("Password incorrect, try again!")) {
          setModalContent({
            title: "Error!",
            message:
              "Password verification failed. Please make sure you entered the correct password.",
          });
        }
        setEmailPassword("");
        setModalIsOpen(true);
      }
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordState;

    if (newPassword !== confirmPassword) {
      setModalContent({
        title: "Error!",
        message: "New password and confirmed password do not match.",
      });
      setPasswordState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setModalIsOpen(true);
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

      setModalContent({
        title: "Success!",
        message: "Password successfully changed!",
      });
      setModalIsOpen(true);
    } catch (error) {
      setModalContent({
        title: "Error!",
        message:
          "Password verification failed. Please make sure you enter the correct password.",
      });
      setPasswordState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      console.error(error);
      setModalIsOpen(true);
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

          setModalContent({
            message: "Account successfully deleted!",
          });
          Auth.logout();
          window.location.assign("/");
        } catch (error) {
          setModalContent({
            message: "An error occurred while deleting the account.",
          });
          console.log(error);
        } finally {
          setDeleteConfirmationCount(0);
          setModalIsOpen(true);
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
    <>
      <div className="account-container">
        <h1 className="account-title">{user.username}</h1>
        <div className="account-info">
          <h2 className="account-subtitle">User Email: {user.email}</h2>
        </div>
        <div className="account-sections">
          <div className="account-section">
            <form className="account-form" onSubmit={handleEmailUpdate}>
              <h2 className="account-subtitle">Change Email</h2>
              <input
                className="account-input"
                name="updateEmail"
                placeholder="New email"
                value={updateEmail}
                onChange={handleChange}
              />
              <input
                className="account-input"
                name="reenterEmail"
                placeholder="Reenter email"
                value={reenterEmail}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <input
                className="account-input"
                type="password"
                name="emailPassword"
                placeholder="Current password"
                value={emailPassword}
                onChange={handleChange}
              />
              <button className="account-button" type="submit">
                Update Email
              </button>
            </form>
          </div>
          <div className="account-section">
            <form className="account-form" onSubmit={handlePasswordUpdate}>
              <h2 className="account-subtitle">Change Password</h2>
              <input
                className="account-input"
                type="password"
                name="currentPassword"
                placeholder="Current password"
                value={passwordState.currentPassword}
                onChange={handleChange}
              />
              <input
                className="account-input"
                type="password"
                name="newPassword"
                placeholder="New password"
                value={passwordState.newPassword}
                onChange={handleChange}
              />
              <input
                className="account-input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordState.confirmPassword}
                onChange={handleChange}
              />
              <button className="account-button" type="submit">
                Update Password
              </button>
            </form>
          </div>
        </div>
        <div className="delete-account">
          <h2 className="account-subtitle">Delete Account</h2>
          <button className="account-button" onClick={handleDeleteAccount}>
            Delete Account
          </button>
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
          <h2>{modalContent.title}</h2>
          <div className="errorText">
            {modalContent.message && (
              <div className="my-3 p-3 bg-danger text-white">
                {modalContent.message}
              </div>
            )}
          </div>
          <button
            className="modal-button"
            onClick={() => {
              setModalIsOpen(false);
              setModalContent({ title: "", message: "" });
            }}
          >
            Close
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default AccountManage;
