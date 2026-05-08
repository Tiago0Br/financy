import { gql } from '@apollo/client'

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      icon
      color
      userId
      user {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_TOP_CATEGORIES = gql`
  query GetTopCategories {
    topCategories {
      category {
        id
        title
        color
      }
      totalAmount
      transactionCount
    }
  }
`
