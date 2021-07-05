import { gql } from '@apollo/client'

// QUERY -- Busca a todos los usuarios
export const SEARCH_USER = gql`
query search($search: String, $min: Int, $max: Int){
  search(search:  $search, min: $min, max: $max){
    id
    name
    username
    email
    createAt
    siteWeb
    avatar
    password
  }
}  		
`