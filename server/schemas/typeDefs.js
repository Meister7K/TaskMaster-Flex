const { gql } = require('apollo-server-express');

//! We need to add the user fields inside type User below this comment) - I think we need to add an ID field to the model

const typeDefs = gql`
  type User {
    username: String
    email: String
    password: String
  }

  type Query {
    users: [User]
  }
`;

module.exports = typeDefs;
