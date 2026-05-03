import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateComment($data: CreateCategoryInput!){
    createCategory(data: $data){
      id
    }
  }
`
