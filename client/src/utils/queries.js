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

export const ALL_ITEMS = gql`
  query items{
    items {
      _id
      consumable
      desc
      itemImage
      itemType
      name
      stats
      value
    } 
  }`;

export const ALL_WEAPONS = gql`
  query weapons{
    weapons {
      _id
      consumable
      desc
      itemImage
      itemType
      name
      stats
      value
  }
}
`
;
export const ALL_ARMORS= gql`
query armors {
  armors {
    _id
    name
    itemType
    stats
    desc
    consumable
    value
    itemImage
  }
}`;

export const ALL_CONSUMABLES = gql`
query consumables {
  consumables {
    _id
    name
    itemType
    stats
    desc
    consumable
    value
    itemImage
  }
}

`;