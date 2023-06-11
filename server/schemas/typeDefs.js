const { gql } = require("apollo-server-express");

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
    changePassword(currentPassword: String!, newPassword: String!): User
    deleteUser: UserDeleteResponse!
  }

  type UserDeleteResponse {
    message: String!
  }
`;

module.exports = typeDefs;
