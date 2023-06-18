import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($email: String, $password: String) {
    updateUser(email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      _id
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      message
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($name: String!, $difficulty: String, $category: String) {
    addTask(name: $name, difficulty: $difficulty, category: $category) {
      _id
      name
      difficulty
      category
      isComplete
      user {
        _id
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export const COMPLETE_TASK = gql`
  mutation completeTask($taskId: ID!) {
    completeTask(taskId: $taskId) {
      _id
      name
      difficulty
      category
      isComplete
      user {
        _id
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      message
    }
  }
`;

export const REMOVE_GOLD = gql`
  mutation removeGold($userId : ID!, $amount: Int!){
    removeGold(userId: $userId, amount: $amount){
      _id
      gold
    }
  }
`;
export const ADD_GOLD = gql`
  mutation addGold($userId : ID!, $amount: Int!){
    addGold(userId: $userId, amount: $amount){
      _id
      gold
    }
  }
`;
export const ADD_TO_INVENTORY=gql`
mutation addToInventory($userId: ID!, $itemId: ID!) {
  addToInventory(userId: $userId, itemId: $itemId) {
    _id
    inventory {
      _id
      name
    }
    gold
  }
}
`;