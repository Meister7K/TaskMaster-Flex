const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    createdAt: String
    updatedAt: String
  }

  type Task {
    _id: ID
    name: String
    difficulty: String
    category: String
    isComplete: Boolean
    user: User
    createdAt: String
    updatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    tasks: [Task]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(email: String, password: String): User
    changePassword(currentPassword: String!, newPassword: String!): User
    deleteUser: UserDeleteResponse!
    addTask(name: String!, difficulty: String, category: String): Task
    completeTask(taskId: ID!): Task
    deleteTask(taskId: ID!): TaskDeleteResponse!
  }

  type UserDeleteResponse {
    message: String!
  }

  type TaskDeleteResponse {
    message: String!
  }
`;

module.exports = typeDefs;
