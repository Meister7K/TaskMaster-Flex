const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type PlayerCharacter{
  _id: ID
  level: Int
  health: Int
  energy: Int
  gold: Int
  equipment: [Item]
  inventory: [Item]
  
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    createdAt: String
    updatedAt: String
    playerChar: PlayerCharacter
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

  type Item {
    _id: ID
    name: String
    itemType: String
    stats: [String]
    desc: String
    consumable: Boolean
    value: Int
    itemImage: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    tasks: [Task]
    items: [Item]
    playerCharacters: [PlayerCharacter]
    weapons: [Item]
    armors: [Item]
    consumables: [Item]
    playerGold(userId: ID!): Int
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
    addToInventory(userId : ID!, itemId : ID!): PlayerCharacter
    addGold(userId : ID!, amount : Int!): PlayerCharacter
    removeGold(userId : ID!, amount : Int!): PlayerCharacter
    equipItem(userId: ID!, itemId: ID!): PlayerCharacter
  }

  type UserDeleteResponse {
    message: String!
  }

  type TaskDeleteResponse {
    message: String!
  }
`;

module.exports = typeDefs;
