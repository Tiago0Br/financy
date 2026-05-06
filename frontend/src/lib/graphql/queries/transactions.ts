import { gql } from '@apollo/client'

export const LIST_TRANSACTIONS = gql`
  query ListTransactions($data: FindTransactionsInput!) {
    listTransactions(data: $data){
      id
      type
      description
      amount
      date
      category {
        id
        title
        color
        icon
      }
    }
  }
`
