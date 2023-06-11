const { gql } = require("apollo-server-express");

//! We need to add the user fields inside type User below this comment) - I think we need to add an ID field to the model

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(email: String, password: String): User
  }
`;

module.exports = typeDefs;
