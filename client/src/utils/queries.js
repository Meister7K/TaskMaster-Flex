import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query tasks {
    tasks {
      _id
      name
      difficulty
      category
      isComplete
      user {
        _id
        username
        email
      }
      createdAt
      updatedAt
    }
  }
`;
