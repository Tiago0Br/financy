import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateComment($data: CreateCategoryInput!){
    createCategory(data: $data){
      id
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($data: UpdateCategoryInput!){
    updateCategory(data: $data){
      id
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!){
    deleteCategory(id: $id)
  }
`
