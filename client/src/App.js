import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Home from "./pages/Home.js";
import About from "./pages/About";
import Game from "./pages/Game";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Auth from "./utils/auth";
import ProfileSetup from "./pages/ProfileSetup";
import Tasks from "./pages/Tasks";
import Shop from "./gamePages/Shop";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState(null);
  // const isAuthenticated = Auth.loggedIn(); uncomment this when pushing to production. requires user to be logged in to play game

  useEffect(() => {
    const loggedInUser = Auth.loggedIn()
      ? Auth.getProfile().data.username
      : null;
    setUser(loggedInUser);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/:username/play"
            element={<Game />}
            // element={isAuthenticated ? <Game /> : <Home />} need to uncomment this line and remove the line above when we push to production
          />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/profilesetup" element={<ProfileSetup />} />
          <Route exact path="/:username/account" element={<Account />} />
          <Route exact path="/:username/tasks" element={<Tasks />} />
          <Route exact path="/:username/shop" element={<Shop />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
