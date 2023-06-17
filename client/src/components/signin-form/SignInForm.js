import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import "./SignInForm.css";
import { GET_GOLD } from "../../utils/queries";

import Auth from "../../utils/auth";

const SignInForm = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const {
    loading2,
    data: wallet,
    refetch: refetchWallet,
  } = useQuery(GET_GOLD, {
    skip: !userId,
    variables: { userId },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      const loggedInUser = Auth.loggedIn()
        ? Auth.getProfile().data.username
        : null;
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  const user = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  useEffect(() => {
    const getGold = async () => {
      if (user) {
        await refetchWallet();
      }
    };
    if (user) {
      getGold();
    }
  }, [user, refetchWallet, wallet]);

  let formattedPlayerGold = "";
  let goldClass = "";

  if (wallet) {
    if (wallet.playerGold >= 10000 && wallet.playerGold < 10000000) {
      formattedPlayerGold = `${Math.floor(wallet.playerGold / 1000)}K`;
      goldClass = "thousands";
    } else if (wallet.playerGold >= 10000000) {
      formattedPlayerGold = `${Math.floor(wallet.playerGold / 1000000)}M`;
      goldClass = "millions";
    } else {
      formattedPlayerGold = wallet.playerGold;
      goldClass = "hundreds";
    }
  }

  const helloUserClass =
    user && user.length > 15 ? "hello-user small-font" : "hello-user";

  return (
    <div className="navbar-sign-in-form">
      <div className="form-input-container">
        {user ? (
          <div className="logout-container">
            <div className="logout-wrapper">
              <div className="user-info">
                <p className={helloUserClass}>{user}</p>
                <div className="row">
                  <p className={goldClass}>{formattedPlayerGold}</p>
                  <div className="gold"></div>
                </div>
              </div>
              <div className="button-wrapper">
                <button
                  className="navbar-btn login-submit-btn"
                  buttonstyle="signIn-btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Auth.logout();
                  }}
                >
                  Logout
                </button>
                <button
                  className="navbar-btn login-submit-btn"
                  buttonstyle="singIn-btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/${user}/account`)}
                >
                  Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <h5>Sign In To Play:</h5>
            <div className="login-form-wrapper">
              <div className="input-columns">
                <input
                  className="navbar-input"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="navbar-input"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div className="btn-bg">
                <button
                  className="navbar-btn login-submit-btn"
                  buttonstyle="signIn-btn"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {error && (
        <div className="login-warning-message">
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
